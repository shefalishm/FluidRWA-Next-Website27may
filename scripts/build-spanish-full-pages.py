#!/usr/bin/env python3
"""Build complete Spanish HTML drafts from the existing FluidRWA pages.

The translated text is prepared on-device with macOS Translation and must be
editorially reviewed before publication. Run with --draft; --apply uses saved
translations so corrections can be made without retranslating everything.
"""

import argparse
import copy
import json
import os
import posixpath
import re
import subprocess
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from lxml import html

ROOT = Path(__file__).resolve().parent.parent
SOURCES = {
    "/": "index.html",
    "/web3vendorecosystem": "vendor-ecosystem.html",
    "/blog/top-tokenization-companies-2026": "blog/top-tokenization-companies-2026/index.html",
    "/vendors/tokenization-platforms": "vendors/tokenization-platforms/index.html",
    "/vendors/fiat-on-off-ramp-providers": "vendors/fiat-on-off-ramps/index.html",
    "/vendors/crypto-custody-providers": "vendors/custody-solutions/index.html",
    "/vendors/blockchain-development-companies": "vendors/blockchain-development/index.html",
    "/blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics": "blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics/index.html",
    "/blog/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging": "blog/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging/index.html",
    "/blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers": "blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers/index.html",
}
SKIP_TAGS = {"script", "style", "noscript", "svg", "code", "pre", "textarea"}
TRANSLATED_ATTRIBUTES = ("alt", "aria-label", "placeholder", "title")
PROTECTED_LABELS = {"FluidRWA", "Vetted", "Vetted Plus", "ERC-3643", "ERC-7518", "KYC", "KYB", "MPC", "API", "APIs", "DeFi", "Web3", "RWA", "HQ"}
EXTRA_NAMES = {
    "Securitize", "Centrifuge", "Fireblocks", "Taurus", "Ripple", "Figure", "Polymath", "Zoniqx",
    "Ondo", "Ondo Finance", "Superstate", "Provenance Blockchain", "Maple Finance", "Canton Network",
    "Backed Finance", "Backed", "Midas", "DigiShares", "ADDX", "KAIO", "Brickken", "Hashnote", "Archax",
    "MoonPay", "Transak", "Banxa", "Chainalysis", "TRM Labs", "Elliptic", "Cognyte",
    "Chainlink", "LayerZero", "Axelar", "Anthropic", "Circle", "Visa", "BlackRock", "Zodia Custody",
}
EDITORIAL_OVERRIDES = {
    "Home": "Inicio",
    "Browse": "Explorar",
    "Best for:": "Puede encajar con:",
    "Tokenization platform snapshot": "Panorama de las plataformas de tokenización",
    "Tokenization vendor comparison snapshot": "Resumen de la comparación de plataformas de tokenización",
    "Category snapshot": "Panorama de la categoría",
    "Custody category snapshot": "Panorama de los proveedores de custodia",
    "Blockchain development category snapshot": "Panorama de los proveedores de desarrollo blockchain",
    "Prefer email?": "¿Prefiere escribirnos?",
    "Explore All Vendors": "Explorar todos los proveedores",
    "View All Insights": "Ver todas las publicaciones",
    "Start with the asset class": "Empiece por el tipo de activo",
    "Start with the asset and the job you need done": "Empiece por el activo y la tarea que debe resolver",
    "Start with the user geography": "Empiece por el país del usuario",
    "Start with regulatory fit": "Compruebe primero el encaje regulatorio",
    "Start with the job to be done": "Defina primero el trabajo que necesita resolver",
    "Compare the same scope": "Compare servicios del mismo alcance",
    "Compare one complete payment corridor at a time": "Compare un corredor de pago completo cada vez",
    "Compare delivery evidence, not just technology lists": "Compare trabajos entregados, no solo listas de tecnologías",
    "How to Design Transfer Controls for Tokenized Securities": "Cómo diseñar controles de transferencia para valores tokenizados",
    "Investor onboarding": "Incorporación de inversores",
    "Explore crawlable vendor profile pages": "Explorar los perfiles públicos de proveedores",
    "Custody & Wallets": "Custodia y monederos",
    "Self-custody": "Autocustodia",
    "Self-Custody": "Autocustodia",
    "Staking": "Staking",
    "Restaking": "Restaking",
    "Restaking Pioneer": "Pionero de restaking",
    "US Treasuries": "Deuda del Tesoro de EE. UU.",
    "Commodities": "Materias primas",
    "Compliance-first controls": "Controles de cumplimiento desde el diseño",
    "Deployment-ready stack": "Infraestructura lista para desplegar",
    "Need a tokenization platform shortlist?": "¿Necesita una selección de plataformas de tokenización?",
    "Need a blockchain development shortlist?": "¿Necesita una selección de empresas de desarrollo blockchain?",
    "Need a custody or wallet infrastructure shortlist?": "¿Necesita una selección de proveedores de custodia o monederos?",
    "Need help choosing a tokenization provider?": "¿Necesita ayuda para elegir un proveedor de tokenización?",
    "Need interoperability infrastructure?": "¿Busca infraestructura de interoperabilidad?",
    "LIVE Ecosystem Use Cases": "Casos de uso destacados",
    "Carbon credit MRV and retirement tracking": "MRV y seguimiento del retiro de créditos de carbono",
    "Evidence capture, registry integrity and buyer reporting for carbon credit issuance and retirement.": "Documentación de pruebas, integridad del registro e informes para compradores en la emisión y el retiro de créditos de carbono.",
    "Web3 Blockchain Compliance Guide": "Guía de cumplimiento para proyectos Web3 y blockchain",
    "Explore blockchain use cases for credit issuance, registry integrity, retirement tracking, and climate finance.": "Explore casos de uso blockchain para la emisión de créditos de carbono, la integridad de los registros, el seguimiento de su retiro y la financiación climática.",
    "Building or listing?": "¿Busca proveedores o quiere presentar su empresa?",
    "Family Office Stack Builder": "Configurador de servicios para family offices",
    "The legal, compliance, custody, payment and technology stack behind tokenized real-world assets.": "Los servicios legales, de cumplimiento, custodia, pagos y tecnología que necesita un proyecto de activos tokenizados.",
    "Showcase your solutions to institutions, enterprises, and organizations actively exploring digital asset and Web3 infrastructure.": "Presente sus soluciones a instituciones y empresas que están evaluando infraestructura Web3 y de activos digitales.",
    "Submit Your Project": "Presentar un proyecto",
    "Describe your requirements and find relevant providers.": "Explique sus requisitos y encuentre proveedores pertinentes.",
    "Electronic trade documents, bills of lading, provenance, customs workflow and trade finance automation tools.": "Documentos comerciales electrónicos, conocimientos de embarque, trazabilidad, trámites aduaneros y herramientas para automatizar la financiación del comercio.",
    "Protocols wanting ongoing, incentive-aligned security through 90K+ white-hat researchers hunting for bugs 24/7": "Protocolos que buscan revisión de seguridad continua mediante una comunidad de más de 90.000 investigadores éticos que detectan vulnerabilidades.",
    "All three can move instructions or tokens between supported chains. Chainlink CCIP documents cross-chain token pools and issuer controls; LayerZero documents configurable messaging and omnichain tokens; Axelar documents General Message Passing and Interchain Token Service. The choice depends on your exact chain pair, token design, security configuration and recovery process. This article does not rank their security or performance.": "Los tres protocolos permiten transmitir instrucciones o tokens entre cadenas compatibles. La documentación de Chainlink CCIP describe pools de tokens y controles del emisor; la de LayerZero, mensajería configurable y tokens omnichain; y la de Axelar, General Message Passing e Interchain Token Service. La elección depende de las dos cadenas concretas, el diseño del token, la configuración de seguridad y el proceso de recuperación. Este artículo no clasifica su seguridad ni su rendimiento.",
    "Start with how much of the customer journey you want to build. MoonPay documents APIs around its widget. Transak offers a Whitelabel API, but its current limitations exclude off-ramp and require a provider step for standard KYC. Banxa Native combines APIs and payment SDKs and requires account approval. These are different integration models, not a fastest-or-cheapest ranking.": "Empiece por decidir qué partes de la experiencia del cliente desarrollará su equipo. MoonPay documenta APIs para integrar su widget. Transak ofrece una API de marca blanca, pero sus limitaciones documentadas excluyen la salida a moneda fiat y requieren un paso gestionado por el proveedor para el KYC estándar. Banxa Native combina APIs y SDK de pago y requiere la aprobación de la cuenta. Son modelos de integración distintos; aquí no se clasifican por velocidad ni por precio.",
    "Compare RWA tokenization platforms": "Compare plataformas de tokenización RWA",
    "Compare Crypto Custody Providers": "Compare proveedores de custodia de criptoactivos",
    "Compare Blockchain Development Companies": "Compare empresas de desarrollo blockchain",
    "Compare Web3 Infrastructure": "Compare infraestructura Web3",
    "Compare KYC and AML providers": "Compare proveedores de verificación de identidad y prevención del blanqueo",
    "Institutional Staking & Validator Infrastructure": "Staking institucional e infraestructura de validadores",
    "Institutional Staking and Validator Infrastructure": "Staking institucional e infraestructura de validadores",
    "Ask Chainalysis to demonstrate these requirements if they matter to your team:": "Pida a Chainalysis que demuestre estos requisitos si son relevantes para su equipo:",
    "Ask Elliptic to demonstrate these requirements if they matter to your team:": "Pida a Elliptic que demuestre estos requisitos si son relevantes para su equipo:",
    "Directory": "Directorio",
    "Find Vendors": "Buscar proveedores",
    "Become a Vetted Listing": "Solicitar una ficha verificada",
    "Custody & Wallets": "Custodia y monederos",
    "Blockchain Projects": "Proyectos blockchain",
    "Insights": "Publicaciones",
    "Tools": "Herramientas",
    "Get a Vetted Shortlist": "Solicitar una selección de proveedores",
    "Get a vendor shortlist": "Solicitar una selección de proveedores",
    "Get a focused shortlist": "Solicitar una selección personalizada",
    "Explore the market": "Explore el mercado",
    "Search the vendor ecosystem": "Busque en el ecosistema de proveedores",
    "Search the directory": "Buscar en el directorio",
    "Explore Vendor Ecosystem": "Explorar el ecosistema de proveedores",
    "Search fiat on and off ramp providers": "Buscar proveedores de rampas fiat-cripto",
    "Explore fiat ramp service areas": "Explore los servicios de las rampas fiat-cripto",
    "Embeddable On-Ramp Widgets": "Widgets integrables para comprar criptoactivos",
    "Off-Ramp & Fiat Settlement": "Venta de criptoactivos y liquidación en moneda fiat",
    "Stablecoin Infrastructure": "Infraestructura de stablecoins",
    "Crypto Payment Processing": "Procesamiento de pagos con criptoactivos",
    "Banking & Account Infrastructure": "Infraestructura bancaria y de cuentas",
    "Regional & Emerging Market Ramps": "Rampas regionales y de mercados emergentes",
    "Compare crypto custody providers": "Compare proveedores de custodia de criptoactivos",
    "Which institutional crypto custody provider is best?": "¿Qué proveedor de custodia institucional conviene elegir?",
    "Start with the permitted entity": "Empiece por la entidad que presta el servicio",
    "Start with policy and workflow": "Examine la política de control y el flujo operativo",
    "Test settlement boundaries": "Compruebe los límites de la liquidación",
    "Test the full lifecycle": "Pruebe el proceso de principio a fin",
    "Explore Custody & Wallet Service Areas": "Explore los servicios de custodia y monederos",
    "Custodian or technology supplier?": "¿Custodio o proveedor de tecnología?",
    "Test authority, not just speed": "Compruebe quién tiene autoridad para mover los activos",
    "Rehearse loss of access": "Ensaye la pérdida de acceso y la recuperación",
    "FluidRWA vendor category": "Categoría de proveedores FluidRWA",
    "qualified custody, MPC wallets, treasury controls and asset operations.": "custodia calificada, monederos MPC, controles de tesorería y operaciones con activos.",
    "you expect custody alone to solve legal issuance or investor distribution.": "espera que la custodia, por sí sola, resuelva la emisión legal o la distribución a inversores.",
    "regulatory status, policy controls, integrations, assets and reporting.": "situación regulatoria, controles operativos, integraciones, activos admitidos e informes.",
    "Compare Blockchain Development Companies": "Compare empresas de desarrollo blockchain",
    "Explore Blockchain Development Service Areas": "Explore los servicios de desarrollo blockchain",
    "Blockchain analytics provider comparison snapshot": "Resumen de la comparación de herramientas de análisis blockchain",
    "Start with the decision your team has to make": "Empiece por la decisión que debe tomar su equipo",
    "Chainalysis vs TRM Labs vs Elliptic vs Cognyte: Direct Decision": "Qué diferencia a Chainalysis, TRM Labs, Elliptic y Cognyte",
    "What to Ask Each Provider to Show": "Qué debe pedir a cada proveedor que demuestre",
    "How Tokenization Teams Should Use These Tools": "Cómo pueden usar estas herramientas los equipos de tokenización",
    "Primary and Authoritative Sources": "Fuentes oficiales y documentación de referencia",
    "FAQ": "Preguntas frecuentes",
    "Short Answer": "Respuesta breve",
    "Where Chainlink CCIP May Not Be Ideal": "Cuándo Chainlink CCIP puede no encajar",
    "Where LayerZero May Not Be Ideal": "Cuándo LayerZero puede no encajar",
    "Where Axelar May Not Be Ideal": "Cuándo Axelar puede no encajar",
    "How to Choose for RWA and Stablecoins": "Cómo elegir para activos tokenizados y stablecoins",
    "Separate ramp funding from merchant payments": "Distinga la financiación de una rampa de los pagos comerciales",
    "Discuss your ramp requirements": "Cuéntenos sus requisitos para la rampa",
    "Top 10 RWA Tokenization Platforms & Companies for 2026 editorial infrastructure visual": "Ilustración editorial de plataformas de tokenización RWA",
    "Comparison infographic grouping Securitize, ADDX, InvestaX, Tokeny, Polymath, Zoniqx, Brickken, DigiShares, Taurus and Libre by buyer starting point": "Infografía de FluidRWA que agrupa diez plataformas de tokenización según el punto de partida del comprador",
    "Should your company be considered?": "¿Deberíamos incluir a su empresa?",
    "Reviewed by FluidRWA Research Team": "Revisado por el equipo de investigación de FluidRWA",
    "Decide how much of checkout your team will build. Then ask where customers complete identity checks and who helps when an order fails. Those answers will shape the integration more than the provider's API count.": "Decida qué partes del proceso de pago desarrollará su equipo. Averigüe dónde se verifica la identidad del cliente y quién responde cuando falla una orden. Para la integración, esas respuestas importan más que la cantidad de APIs del proveedor.",
    "Need help choosing the right category? Browse": "¿Necesita ayuda para elegir la categoría? Consulte",
    "Investor fiat funding and merchant invoice collection are adjacent workflows, not the same purchase. Read the": "Financiar inversiones con moneda fiat y cobrar facturas comerciales son procesos relacionados, pero requieren soluciones distintas. Lea la",
    "For a fund issuer, the useful CCIP question is whether the proposed token pools and permissions can implement its transfer policy on both chains. The documentation includes rate-limit and emergency-action controls, but a buyer still needs to inspect the actual configuration.": "Un emisor de fondos debe comprobar si los pools de tokens y los permisos propuestos pueden aplicar su política de transferencias en ambas cadenas. La documentación de CCIP describe límites de tasa y acciones de emergencia, pero el comprador debe revisar la configuración concreta.",
    "Best for": "Puede encajar con",
    "Finding a Trusted Web3 Vendor is not easy": "Encuentre un proveedor Web3 de confianza",
    "Describe what you are building. FluidRWA will identify the vendor categories, decisions and next steps you need.": "Cuéntenos qué está construyendo. Le ayudaremos a identificar los tipos de proveedores, las decisiones clave y los próximos pasos.",
    "Start with one simple description": "Empiece por describir su proyecto",
    "Explore practical buyer workflows across tokenization, compliance, documents, payments and AI infrastructure.": "Explore casos de uso de tokenización, cumplimiento, gestión documental, pagos e infraestructura de IA.",
    "Tokenized fund issuance, investor access and servicing for institutional treasury exposure.": "Emisión de fondos tokenizados, acceso de inversores y administración de productos vinculados a deuda pública.",
    "Fund wrappers and protocol infrastructure connecting traditional managers with onchain capital markets.": "Estructuras de fondos e infraestructura que conectan a gestores tradicionales con los mercados de capitales en cadena.",
    "Problem": "El problema",
    "Solution": "La solución",
    "FluidRWA is the discovery place for Web3 vendors": "Un lugar para descubrir y comparar proveedores Web3",
    "Learn the market before choosing a vendor": "Infórmese antes de elegir un proveedor",
    "Built for the Digital Asset and Web3 Infrastructure Ecosystem": "Para quienes construyen infraestructura de activos digitales",
    "Built for trust, not hype": "Información útil para tomar decisiones",
    "Built for projects, vendors, and institutions": "Para proyectos, proveedores e instituciones",
    "Independent vendor intelligence": "Información independiente sobre proveedores",
    "Search 30+ infrastructure categories, compare providers and build a shortlist around your architecture, jurisdiction and operating model.": "Explore más de 30 categorías de infraestructura y compare proveedores según su arquitectura, jurisdicción y modelo operativo.",
    "Compare 10 RWA tokenization platforms for funds, real estate and private markets. Understand operating models, buyer checks and the other providers you need.": "Compare diez plataformas de tokenización para fondos, inmuebles y mercados privados. Revise cómo operan, qué debe comprobar y qué otros proveedores necesitará.",
    "Compare issuer-side tokenization platforms for real-world assets, funds, securities and private markets by compliance, custody, investor onboarding, transfer controls and lifecycle servicing.": "Compare plataformas de tokenización para emisores de fondos, valores y otros activos. Examine sus controles de cumplimiento, custodia, acceso de inversores, transferencias y administración posterior a la emisión.",
    "Discover providers that help users, wallets, exchanges, fintech apps and tokenization platforms move between bank money, cards, mobile money, stablecoins and digital assets.": "Explore proveedores que conectan cuentas bancarias, tarjetas y dinero móvil con stablecoins y otros activos digitales para usuarios, monederos, plataformas de intercambio y aplicaciones financieras.",
    "Compare 28 institutional crypto custody providers across qualified custody, MPC wallets, tokenized-asset support, staking, governance, integrations and reporting.": "Compare 28 proveedores de custodia institucional por tipo de servicio, monederos MPC, soporte de activos tokenizados, staking, controles de gobierno, integraciones e informes.",
    "Find specialized Web3 infrastructure providers across smart contract auditing, developer platforms, oracle networks, L1 and L2 chains, cross-chain protocols, bug bounties, account abstraction and automation.": "Encuentre empresas especializadas en auditorías de contratos inteligentes, herramientas para desarrolladores, oráculos, redes L1 y L2, interoperabilidad, programas de recompensas, abstracción de cuentas y automatización.",
    "Compare four crypto analytics platforms for wallet screening, transaction monitoring, sanctions, investigations and forensics.": "Compare cuatro plataformas de análisis blockchain para evaluar monederos, supervisar transacciones, detectar riesgos de sanciones e investigar operaciones.",
    "Compare Chainlink CCIP, LayerZero and Axelar for cross-chain messaging, token transfers, interoperability, tokenized assets and multi-chain applications.": "Compare Chainlink CCIP, LayerZero y Axelar para mensajería entre cadenas, transferencias de tokens y aplicaciones que operan en varias redes.",
    "Compare documented ramp onboarding, KYC hand-offs, wallet controls and order tracking. Download a sourced MoonPay, Transak and Banxa dataset.": "Compare los procesos documentados de incorporación, verificación de identidad, control de monederos y seguimiento de órdenes de MoonPay, Transak y Banxa. Descargue el conjunto de datos con sus fuentes.",
}
SPANISH_COPYEDITS = {
    "rampa de encendido/apagado": "rampa de entrada y salida",
    "rampa de acceso/salida": "rampa de entrada y salida",
    "rampas de encendido/apagado": "rampas de entrada y salida",
    "las permisos": "los permisos",
    "Commerciantes": "comerciantes",
    "de etiqueta blanca": "de marca blanca",
    "Inicio de sesión de inversionistas": "Incorporación de inversores",
    "valores cotizados en moneda fiduciaria": "valores tokenizados",
    "cuidado de propiedad calificado": "custodia calificada",
    "Cuidado de propiedad calificado": "Custodia calificada",
    "repuestaquiz": "restaking",
    "Repuestaquiz": "Restaking",
    "encendido/apagado": "entrada y salida",
    "rampón de": "rampa de",
    "Cuidador calificado": "Custodio calificado",
    "cuidador calificado": "custodio calificado",
    "la cumplimiento": "el cumplimiento",
    "las valores": "los valores",
    "de la cumplimiento": "del cumplimiento",
    "un piloto piloto": "un piloto",
}
CURATED_HEADINGS = {
    "/web3vendorecosystem": "Compare más de 1.000 proveedores Web3, RWA e IA",
    "/blog/top-tokenization-companies-2026": "10 plataformas de tokenización RWA para evaluar en 2026",
    "/vendors/tokenization-platforms": "Plataformas de tokenización RWA para emisores y gestores de activos",
    "/vendors/fiat-on-off-ramp-providers": "Proveedores de rampas de entrada y salida entre dinero fiat y criptoactivos",
    "/vendors/crypto-custody-providers": "Comparación de proveedores de custodia institucional de criptoactivos",
    "/vendors/blockchain-development-companies": "Empresas de desarrollo blockchain",
    "/blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics": "Chainalysis, TRM Labs, Elliptic y Cognyte: comparación de análisis blockchain",
    "/blog/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging": "Chainlink CCIP, LayerZero y Axelar: comparación de mensajería entre cadenas",
    "/blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers": "MoonPay, Transak y Banxa: comparación de APIs de rampas fiat-cripto",
}
CURATED_METADATA = {
    "/": ("Proveedores Web3, RWA e IA para su proyecto | FluidRWA", "Encuentre proveedores para tokenización, custodia, pagos y desarrollo blockchain. Compare sus funciones antes de solicitar una propuesta."),
    "/web3vendorecosystem": ("Ecosistema de proveedores Web3 y RWA | FluidRWA", "Explore el ecosistema de proveedores de tokenización, custodia, pagos, cumplimiento e infraestructura, y compare quién hace qué."),
    "/blog/top-tokenization-companies-2026": ("10 plataformas de tokenización RWA para evaluar en 2026 | FluidRWA", "Compare diez plataformas de tokenización para fondos, inmuebles y mercados privados, con criterios de selección y preguntas para compradores."),
    "/vendors/tokenization-platforms": ("Plataformas de tokenización RWA | FluidRWA", "Compare proveedores de tokenización por su función en la emisión, el registro de inversores y la operación posterior al lanzamiento."),
    "/vendors/fiat-on-off-ramp-providers": ("Proveedores de rampas fiat-cripto | FluidRWA", "Compare rampas de entrada y salida según país, método de pago, activo, red y responsabilidades de verificación."),
    "/vendors/crypto-custody-providers": ("Custodia institucional de criptoactivos | FluidRWA", "Compare proveedores de custodia institucional y tecnología de monederos, y aclare qué entidad responde por los activos."),
    "/vendors/blockchain-development-companies": ("Empresas de desarrollo blockchain | FluidRWA", "Explore empresas de desarrollo blockchain y evalúe su experiencia en contratos, integraciones y mantenimiento."),
    "/blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics": ("Chainalysis, TRM Labs, Elliptic y Cognyte | FluidRWA", "Compare herramientas de análisis blockchain para alertas, investigación y cumplimiento según el trabajo que debe realizar su equipo."),
    "/blog/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging": ("Chainlink CCIP, LayerZero y Axelar | FluidRWA", "Compare tres enfoques de mensajería entre cadenas y las preguntas de seguridad y control relevantes para activos tokenizados."),
    "/blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers": ("MoonPay, Transak y Banxa: APIs de rampas | FluidRWA", "Compare modelos de integración de rampas fiat-cripto, procesos de verificación y responsabilidades operativas."),
}
CURATED_VENDOR_INDEX_LABELS = {
    "/vendors/tokenization-platforms": [
        "Emisión y administración de activos tokenizados", "Emisión con controles de cumplimiento",
        "Plataforma de marca blanca", "Infraestructura para entidades financieras",
        "Tokenización de activos empresariales", "Desarrollo de plataformas de tokenización",
        "Plataforma de tokenización con licencia", "Tokenización sin código",
        "Infraestructura de marca blanca", "Infraestructura integral de tokenización",
        "Plataforma institucional de tokens de valores",
    ],
    "/vendors/fiat-on-off-ramp-providers": [
        "Pagos y rampas fiat-cripto", "Infraestructura de rampas reguladas",
        "Rampa para Oriente Medio y África", "Rampa de Bitcoin para mercados africanos",
        "Procesamiento de pagos con criptoactivos", "API de infraestructura para stablecoins",
        "Emisión de USDC e infraestructura", "Compra de criptoactivos integrada",
        "Liquidación empresarial en moneda fiat", "Rampa para varias redes",
        "Dinero móvil y rampas en África", "Rampas en América Latina",
        "Conexión entre cuentas y activos digitales", "Rampas y servicios de pago europeos",
        "Compra integrada sin redirección", "Rampa orientada al consumidor",
        "Agregación de proveedores de rampas", "Pagos y stablecoins para usuarios de PayPal",
        "SDK de rampas para desarrolladores", "Prevención del fraude y liquidación",
        "Pagos en Solana", "Pagos y facturación con stablecoins",
        "Conversión de stablecoins a moneda fiat", "Pagos empresariales entre fiat y criptoactivos",
        "Emisión de USDT", "Rampas con cobertura internacional",
        "Pagos internacionales con criptoactivos", "API para transferencias y controles",
        "Rampas y pagos en mercados africanos",
    ],
    "/vendors/crypto-custody-providers": [
        "Banco de activos digitales con autorización federal", "Custodia y negociación",
        "Multifirma y custodia calificada", "Custodia bancaria de activos digitales",
        "Custodia integrada en una plataforma de intercambio", "Custodia MPC en varias redes",
        "Liquidación fuera de las plataformas de intercambio", "Custodia digital de una entidad financiera",
        "Operaciones de custodia y tesorería MPC", "Monederos MPC institucionales",
        "Custodia fría aislada de la red", "Monedero multifirma de contratos inteligentes",
        "Custodia de activos digitales en Asia", "Custodia institucional conjunta",
        "Custodia con módulos de seguridad de hardware", "Infraestructura de monederos en varias redes",
        "Custodia y negociación en mercados emergentes", "Orquestación de infraestructura bancaria",
        "Custodia de activos digitales en Singapur", "Red de custodia MPC descentralizada",
        "Módulos de seguridad de hardware", "Banco suizo de activos digitales",
        "Infraestructura bancaria para activos digitales", "Custodia de marca blanca en Alemania",
        "Cifrado y gestión de claves", "Criptografía de umbral",
        "Ingeniería de custodia a medida", "Custodia institucional vinculada a un banco",
    ],
    "/vendors/blockchain-development-companies": [
        "Herramientas y APIs para desarrolladores", "Infraestructura descentralizada de nodos",
        "Blockchain de capa 1", "Mensajería entre cadenas",
        "Abstracción de cuentas", "Auditorías y seguridad blockchain",
        "Oráculos e interoperabilidad", "Auditorías de seguridad competitivas",
        "Desarrollo del ecosistema Ethereum", "Restaking y seguridad compartida",
        "Automatización Web3", "Seguridad blockchain y pruebas de penetración",
        "Red empresarial de capa 1", "Programas de recompensas por errores",
        "Interoperabilidad entre cadenas", "APIs de datos Web3",
        "Investigación e infraestructura Ethereum", "Estándares y auditorías de contratos inteligentes",
        "Escalado en varias redes", "Oráculos de datos de mercado",
        "Auditorías de seguridad blockchain", "Infraestructura de nodos en varias redes",
        "Auditorías y cobertura frente a riesgos", "Red de capa 1",
        "Red de capa 2 con pruebas ZK-STARK", "Desarrollo de contratos inteligentes",
        "Indexación de datos blockchain", "Desarrollo integral Web3",
        "Investigación y auditorías de seguridad", "Mensajería entre cadenas",
    ],
}
BRAND_REPAIRS = {
    "Ondo Finance": ("Ondo Finanzas",),
    "Superstate": ("Superestado", "superestado"),
    "Canton Network": ("Red Canton",),
    "Provenance Blockchain": ("Blockchain de origen probado",),
    "Backed": ("Apoyado", "apoyado"),
    "Zodia Custody": ("Cuidado de Zodia", "Custodia de Zodia"),
}
WORK = ROOT / "content" / "es-work"
OUTPUT = ROOT / "content" / "es-full"


def protected_names():
    profiles = json.loads((ROOT / "data" / "company-profiles.json").read_text(encoding="utf-8"))
    names = set(PROTECTED_LABELS) | EXTRA_NAMES
    for profile in profiles.values():
        name = profile.get("name", "")
        if name and len(name) > 2:
            names.add(name)
    return sorted(names, key=len, reverse=True)


NAMES = protected_names()
NAME_PATTERN = re.compile(r"(?<![\w])(?:" + "|".join(re.escape(name) for name in NAMES) + r")(?![\w])")


def protect(value):
    substitutions = []

    def replace(match):
        index = len(substitutions)
        substitutions.append(match.group(0))
        return f"⟦ZK{index}Z⟧"

    return NAME_PATTERN.sub(replace, value), substitutions


def restore(value, substitutions):
    for index, original in enumerate(substitutions):
        value = value.replace(f"⟦ZK{index}Z⟧", original)
        value = value.replace(f"ZK{index}Z", original)
    return value


def local_path(route):
    return "index" if route == "/" else route.strip("/").replace("/", "__")


def document_for(route):
    return html.fromstring((ROOT / SOURCES[route]).read_text(encoding="utf-8"))


def visible(element):
    current = element
    while current is not None:
        if isinstance(current.tag, str) and current.tag.lower() in SKIP_TAGS:
            return False
        current = current.getparent()
    return True


def is_vendor_name(element):
    current = element
    while current is not None:
        if "bc-company-mark" in current.get("class", "").split():
            return True
        current = current.getparent()
    if element.get("itemprop") == "name" and element.getparent() is not None:
        return True
    if element.tag.lower() not in {"h3", "a"}:
        return False
    current = element.getparent()
    while current is not None:
        classes = set(current.get("class", "").split())
        if classes & {"vendor-card", "bc-company-card", "bc-provider-card", "vendor-profile-index-card"}:
            return True
        current = current.getparent()
    return False


def segments(document):
    seen = set()
    result = []

    def add(value):
        if not value:
            return
        normalized = value.strip()
        if not normalized or not re.search(r"[A-Za-z]{2,}", normalized):
            return
        if normalized not in seen:
            seen.add(normalized)
            result.append(normalized)

    for element in document.xpath("//body//*"):
        if not visible(element):
            continue
        if element.get("itemprop") == "name" and element.tag.lower() in {"h2", "h3"}:
            pass  # Brand names are checked during editorial review.
        add(element.text)
        for attribute in TRANSLATED_ATTRIBUTES:
            add(element.get(attribute))
        if element.tail and visible(element.getparent()):
            add(element.tail)
    for element in document.xpath("//title|//meta[@name='description']|//meta[@property='og:title']|//meta[@property='og:description']"):
        add(element.text)
        add(element.get("content"))
    return result


def translate(values, existing, checkpoint):
    environment = os.environ.copy()
    environment["CLANG_MODULE_CACHE_PATH"] = "/tmp/fluidrwa-swift-cache"
    environment["SWIFT_MODULE_CACHE_PATH"] = "/tmp/fluidrwa-swift-cache"
    translated = dict(existing)
    pending = [value for value in values if value not in translated]
    for start in range(0, len(pending), 128):
        part = pending[start:start + 128]
        protected = [protect(value) for value in part]
        result = subprocess.run(
            ["swift", str(ROOT / "scripts" / "translate-spanish.swift")],
            input=json.dumps([item[0] for item in protected], ensure_ascii=False), text=True,
            stdout=subprocess.PIPE, check=True, env=environment,
        )
        outputs = json.loads(result.stdout)
        if len(outputs) != len(part) or any(not value for value in outputs):
            raise ValueError(f"Incomplete translation result at segment {start}")
        for index, value in enumerate(outputs):
            translated[part[index]] = restore(value, protected[index][1])
        checkpoint(translated)
        print(f"Translated {len(translated)} of {len(values)}", flush=True)
    return translated


def put_text(value, translations):
    if value is None:
        return None
    stripped = value.strip()
    logo = re.fullmatch(r"(.+?) logo", stripped, flags=re.IGNORECASE)
    if logo:
        return value.replace(stripped, f"Logotipo de {logo.group(1)}")
    if stripped in PROTECTED_LABELS:
        return value
    if stripped in EDITORIAL_OVERRIDES:
        return value.replace(stripped, EDITORIAL_OVERRIDES[stripped])
    if stripped not in translations:
        return value
    leading = value[:len(value) - len(value.lstrip())]
    trailing = value[len(value.rstrip()):]
    translated = restore(translations[stripped], protect(stripped)[1])
    if re.search(r"\bstaking\b", stripped, flags=re.IGNORECASE):
        translated = re.sub(r"\b(apuestas|apuesta|estacas)\b", "staking", translated, flags=re.IGNORECASE)
    for brand, variants in BRAND_REPAIRS.items():
        if brand in stripped and brand not in translated:
            for variant in variants:
                translated = translated.replace(variant, brand)
    if re.search(r"\bcustody\b", stripped, flags=re.IGNORECASE):
        translated = re.sub(r"\bAutocuidado\b", "Autocustodia", translated)
        translated = re.sub(r"\bautocuidado\b", "autocustodia", translated)
        translated = re.sub(r"\bCuidado\b", "Custodia", translated)
        translated = re.sub(r"\bcuidado\b", "custodia", translated)
    if re.search(r"\bcustodian\b", stripped, flags=re.IGNORECASE):
        translated = re.sub(r"\bCuidador\b", "Custodio", translated)
        translated = re.sub(r"\bcuidador\b", "custodio", translated)
    if re.search(r"\b(?:staking|staked|restaking)\b", stripped, flags=re.IGNORECASE):
        translated = re.sub(r"\b(?:Apuestas|Apostaciones|Apostación|apuestas|apostaciones|apostación|apalancamiento)\b", "staking", translated)
        translated = re.sub(r"\b(?:reposici[oó]n de staking|reaprovechamiento|Reaprovechamiento|Repuestaquiz)\b", "restaking", translated)
    for unedited, corrected in SPANISH_COPYEDITS.items():
        translated = translated.replace(unedited, corrected)
    return leading + translated + trailing


def rewrite_link(value, route):
    if not value:
        return value
    parsed = urlsplit(value)
    if parsed.netloc in {"www.fluidrwa.com", "fluidrwa.com"}:
        internal_path = parsed.path.rstrip("/") or "/"
        if internal_path in SOURCES:
            spanish = "/es" if internal_path == "/" else "/es" + internal_path
            return urlunsplit((parsed.scheme, parsed.netloc, spanish, parsed.query, parsed.fragment))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return value
    if parsed.path.startswith("/"):
        clean_path = parsed.path.rstrip("/") or "/"
    else:
        source_folder = posixpath.dirname(SOURCES[route])
        relative = posixpath.normpath(posixpath.join(source_folder, parsed.path))
        if relative == "index.html":
            clean_path = "/"
        elif relative.endswith("/index.html"):
            clean_path = "/" + relative.removesuffix("/index.html")
        elif relative.endswith(".html"):
            clean_path = "/" + relative.removesuffix(".html")
        else:
            clean_path = "/" + relative.lstrip("/")
        if relative == "vendor-ecosystem.html":
            clean_path = "/web3vendorecosystem"
    if clean_path in SOURCES:
        spanish = "/es" if clean_path == "/" else "/es" + clean_path
        return urlunsplit(("", "", spanish, parsed.query, parsed.fragment))
    return urlunsplit(("", "", clean_path, parsed.query, parsed.fragment))


def set_linked_copy(paragraph, intro, labels, tails):
    links = paragraph.xpath("./a")
    if len(links) != len(labels) or len(links) != len(tails):
        raise ValueError("Editorial link copy does not match the source links")
    for child in list(paragraph):
        if child.tag != "a":
            paragraph.remove(child)
    paragraph.text = intro
    for link, label, tail in zip(links, labels, tails):
        link.text = label
        link.tail = tail


def apply_document(route, translations):
    document = document_for(route)
    original_schemas = []
    for element in document.xpath("//head//script[@type='application/ld+json']"):
        try:
            original_schemas.append(json.loads(element.text or "{}"))
        except json.JSONDecodeError:
            pass
    document.set("lang", "es")
    for element in document.xpath("//body//*"):
        if not visible(element):
            continue
        if not is_vendor_name(element) and element.get("itemprop") != "addressCountry":
            element.text = put_text(element.text, translations)
        for attribute in TRANSLATED_ATTRIBUTES:
            if element.get(attribute):
                element.set(attribute, put_text(element.get(attribute), translations))
        if element.tail and visible(element.getparent()):
            element.tail = put_text(element.tail, translations)
        if element.get("data-search"):
            searchable = " ".join(text.strip() for text in element.itertext() if text.strip())[:500]
            element.set("data-search", element.get("data-search") + " " + searchable)

    for element in document.xpath("//*[@href or @src]"):
        for attribute in ("href", "src"):
            if element.get(attribute):
                element.set(attribute, rewrite_link(element.get(attribute), route))

    for element in document.xpath("//title|//meta[@name='description']|//meta[@property='og:title']|//meta[@property='og:description']"):
        element.text = put_text(element.text, translations)
        if element.get("content"):
            element.set("content", put_text(element.get("content"), translations))

    title, description = CURATED_METADATA[route]
    head = document.find("head")
    head.find("title").text = title
    for element in head.xpath(".//meta[@name='description' or @property='og:description']"):
        element.set("content", description)
    for element in head.xpath(".//meta[@property='og:title']"):
        element.set("content", title.removesuffix(" | FluidRWA"))

    headings = document.xpath("//h1")
    if headings:
        heading = headings[0]
        if route == "/":
            emphasis = heading.xpath("./span")
            if emphasis:
                heading.text = "Encuentre un proveedor Web3 "
                emphasis[0].text = "de confianza"
                emphasis[0].tail = ""
        elif route in CURATED_HEADINGS:
            heading.text = CURATED_HEADINGS[route]
            for child in list(heading):
                heading.remove(child)

    if route == "/vendors/tokenization-platforms":
        grids = document.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-grid ')]")
        if grids:
            grid = grids[0]
            cards = grid.xpath("./article[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-card ')]")
            zoniqx = next((card for card in cards if card.get("id") == "zoniqx"), None)
            if zoniqx is not None and len(cards) >= 10:
                grid.remove(zoniqx)
                grid.insert(9, zoniqx)
                for number, card in enumerate(grid.xpath("./article[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-card ')]"), 1):
                    index = card.xpath(".//p[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-index ')]")
                    if index and index[0].text:
                        index[0].text = re.sub(r"^\d{2}\s*/", f"{number:02d} /", index[0].text)

    if route in CURATED_VENDOR_INDEX_LABELS:
        labels = CURATED_VENDOR_INDEX_LABELS[route]
        cards = document.xpath("//article[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-card ')]")
        if len(cards) != len(labels):
            raise ValueError(f"{route}: expected {len(labels)} vendor cards, found {len(cards)}")
        for card, label in zip(cards, labels):
            index = card.xpath(".//p[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-index ')]")
            if not index:
                raise ValueError(f"{route}: missing vendor index")
            original = index[0].text_content().strip()
            number = original.split("/", 1)[0].strip()
            index[0].text = f"{number} / {label}"

    if route == "/vendors/crypto-custody-providers":
        directory = document.xpath("//section[@id='custody-directory']")
        if directory:
            answer = html.fragment_fromstring(
                '<aside class="directory-answer" aria-label="Cómo comparar proveedores de custodia institucional">'
                '<strong>Respuesta breve</strong>'
                '<p>Compare la situación legal del custodio, el control de claves, el alcance del seguro, '
                'los activos y redes admitidos, las autorizaciones de transacciones, los informes y la recuperación. '
                'Un custodio regulado, una plataforma de monederos MPC y un banco custodio no prestan necesariamente el mismo servicio. '
                'La selección debe partir de quién mantiene los activos, quién puede autorizar movimientos y qué pruebas exigirá su auditor.</p>'
                '<p>Revise las <a href="/blog/crypto-custody-insurance-coverage-due-diligence">exclusiones de los seguros de custodia</a> '
                'y los <a href="/blog/wallet-apis-asset-tokenization-platforms">modelos de control de APIs de monederos</a> '
                'antes de enviar una solicitud de propuestas.</p></aside>'
            )
            directory[0].addprevious(answer)

    if route == "/blog/top-tokenization-companies-2026":
        paragraphs = document.xpath("//main//p")
        for paragraph in paragraphs:
            content = paragraph.text_content()
            links = paragraph.xpath("./a")
            if content.startswith("¿Tienes un proyecto definido?") and len(links) == 2:
                set_linked_copy(paragraph, "¿Tiene un proyecto definido? ",
                    ["Envíe sus requisitos", "contact@fluidrwa.com"],
                    [" o escriba a ", ". Si representa a una empresa que quiere aparecer en esta comparativa, utilice la opción de consideración de empresas situada debajo de la tabla."])
            elif content.startswith("Si todavía estás decidiendo si tu activo está listo") and len(links) == 6:
                set_linked_copy(paragraph, "Si aún no sabe si su activo está listo, empiece por la ",
                    ["evaluación de preparación para la tokenización", "plataformas de tokenización",
                     "proveedores de custodia institucional", "proveedores de rampas fiat-cripto",
                     "proveedores de KYC y AML", "proveedores de infraestructura de cumplimiento"],
                    [". Si ya conoce el tipo de activo y necesita proveedores, compare ", ", ", ", ", ", ", " y ", "."])
            elif content.startswith("Para la diligencia arquitectónica") and len(links) == 3:
                set_linked_copy(paragraph, "Para revisar la arquitectura, consulte las guías sobre ",
                    ["APIs de monederos para tokenización", "cobertura y exclusiones del seguro de custodia",
                     "preguntas para evaluar proveedores de pagos con stablecoins"],
                    [", ", " y ", ". Esos análisis ayudan a definir responsabilidades que una lista de plataformas no puede resolver por sí sola."])
            elif content.startswith("Estas son descripciones de empresas") and len(links) == 10:
                names = ["Securitize", "Tokeny", "Zoniqx", "Brickken", "DigiShares", "Polymath",
                         "ADDX", "Taurus-CAPITAL", "InvestaX", "KAIO"]
                set_linked_copy(paragraph,
                    "Estas descripciones proceden de las empresas; no son pruebas independientes de rendimiento. Documentación consultada para la lista el 25 de octubre de 2026: ",
                    names, [", "] * 8 + [" y ", ". Antes de contratar, confirme la entidad responsable, las licencias, la disponibilidad del producto y el alcance de la implementación."])
            elif content.startswith("Para una comparación más cercana") and len(links) == 2:
                set_linked_copy(paragraph, "Para comparar los servicios empresariales, lea ",
                    ["Securitize, Tokeny y Zoniqx", "la guía sobre ERC-7518"],
                    [". Quienes estudien el modelo DyCIST de Zoniqx también deberían leer ",
                     ", ya que ERC-7518 sigue siendo una propuesta de Ethereum en revisión, no un estándar final."])
            elif content.startswith("Si la conformidad sigue siendo incierta") and len(links) == 2:
                set_linked_copy(paragraph, "Si todavía no tiene claro el marco de cumplimiento, consulte ",
                    ["la comparación de proveedores KYC", "la guía de cumplimiento Web3"],
                    [" y ", " antes de seleccionar una plataforma."])
            elif content.startswith("Próximo paso útil:") and len(links) == 1:
                href = links[0].get("href", "")
                if "tokeny-vs-securitize" in href:
                    set_linked_copy(paragraph, "Para profundizar en la decisión, lea ",
                        ["la comparación de Tokeny y Securitize"], ["."])
                elif "tokenization-readiness" in href:
                    set_linked_copy(paragraph, "Antes de comparar Zoniqx con otras plataformas, complete ",
                        ["la evaluación de preparación para la tokenización"],
                        [". El encaje depende del tipo de activo y del modelo de lanzamiento."])
                else:
                    set_linked_copy(paragraph, "Compare Securitize con ",
                        ["otras plataformas de tokenización"],
                        [" y determine si necesita tecnología de emisión, servicios regulados, un agente de transferencia o acceso a un mercado secundario."])
            elif content.startswith("Si varios de estos no están resueltos") and len(links) == 1:
                set_linked_copy(paragraph, "Si todavía hay decisiones abiertas, complete ",
                    ["la evaluación de preparación para la tokenización"],
                    [" antes de hablar con los proveedores. Le ayudará a determinar qué servicios necesita además de la plataforma."])
            elif content.startswith("FluidRWA puede ayudar con ese proceso") and len(links) == 3:
                set_linked_copy(paragraph, "Para seguir adelante, puede completar ",
                    ["la evaluación de preparación", "la comparación de plataformas", "sus requisitos"],
                    [", consultar ", " o enviarnos ", " para solicitar una selección de proveedores."])

    if route == "/blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers":
        for paragraph in document.xpath("//main//p"):
            content = paragraph.text_content()
            links = paragraph.xpath("./a")
            if content.startswith("¿Necesita ayuda para elegir la categoría?") and len(links) == 3:
                set_linked_copy(paragraph, "¿Necesita ayuda para elegir la categoría? Consulte ",
                    ["los proveedores de rampas fiat-cripto", "envíe sus requisitos", "contact@fluidrwa.com"],
                    [", ", " o escriba a ", "."])
            elif content.startswith("Financiar inversiones con moneda fiat") and len(links) == 1:
                set_linked_copy(paragraph,
                    "Financiar inversiones con moneda fiat y cobrar facturas comerciales son procesos relacionados, pero requieren soluciones distintas. Consulte ",
                    ["la guía para compradores de pasarelas de pago con criptoactivos de marca blanca"],
                    [" para entender quién opera cada parte del servicio."])
            elif content.startswith("explorar ") and len(links) == 2:
                set_linked_copy(paragraph, "Para ampliar la búsqueda, consulte ",
                    ["el directorio de proveedores de rampas fiat-cripto", "contact@fluidrwa.com"],
                    [". También puede escribir a ", "."])

    spanish_url = "https://www.fluidrwa.com/es" + ("" if route == "/" else route)
    english_url = "https://www.fluidrwa.com" + ("" if route == "/" else route)
    for element in head.xpath(".//link[@rel='canonical']"):
        element.set("href", spanish_url)
    for element in head.xpath(".//meta[@property='og:url']"):
        element.set("content", spanish_url)
    locales = head.xpath(".//meta[@property='og:locale']")
    if locales:
        locales[0].set("content", "es_ES")
    else:
        head.append(html.Element("meta", property="og:locale", content="es_ES"))
    for element in head.xpath(".//script[@type='application/ld+json']"):
        element.getparent().remove(element)
    for language, url in (("es", spanish_url), ("en", english_url), ("x-default", english_url)):
        element = html.Element("link", rel="alternate", hreflang=language, href=url)
        head.append(element)
    schema = {
        "@context": "https://schema.org",
        "@type": "Article" if route.startswith("/blog/") else "WebPage",
        "headline": title.removesuffix(" | FluidRWA"),
        "description": description,
        "inLanguage": "es",
        "url": spanish_url,
        "isBasedOn": english_url,
        "publisher": {"@type": "Organization", "name": "FluidRWA", "url": "https://www.fluidrwa.com"},
    }
    if route.startswith("/blog/"):
        articles = []
        images = []
        for source_schema in original_schemas:
            candidates = source_schema.get("@graph", [source_schema])
            articles.extend(item for item in candidates if item.get("@type") in ("Article", "BlogPosting"))
            images.extend(item for item in candidates if item.get("@type") == "ImageObject")
        if articles:
            original = articles[0]
            for key in ("datePublished", "dateModified", "author", "image", "citation", "about"):
                if key in original:
                    schema[key] = original[key]
            schema["mainEntityOfPage"] = {"@type": "WebPage", "@id": spanish_url}
        if images:
            image_schema = dict(images[0])
            for key in ("name", "caption"):
                if image_schema.get(key):
                    image_schema[key] = put_text(image_schema[key], translations)
            schema = {"@context": "https://schema.org", "@graph": [{key: value for key, value in schema.items() if key != "@context"}, image_schema]}
    element = html.Element("script", type="application/ld+json")
    element.text = json.dumps(schema, ensure_ascii=False).replace("<", "\\u003c")
    head.append(element)
    body = document.find("body")
    body.set("data-fluidrwa-es-full", "1")
    if route == "/web3vendorecosystem" or route.startswith("/vendors/"):
        reference = OUTPUT / "blog__top-tokenization-companies-2026.html"
        if reference.exists():
            shared = html.fromstring(reference.read_text(encoding="utf-8"))
            for tag in ("header", "footer"):
                current = body.xpath(f"./{tag}")
                replacement = shared.xpath(f"//body/{tag}")
                if current and replacement:
                    element = copy.deepcopy(replacement[0])
                    for switch in element.xpath(".//a[contains(concat(' ', normalize-space(@class), ' '), ' fluidrwa-language-switch ')]"):
                        switch.set("href", english_url)
                    current[0].getparent().replace(current[0], element)
    nav = body.xpath(".//header//*[contains(concat(' ', normalize-space(@class), ' '), ' nav-links ')]")
    if not nav:
        nav = body.xpath(".//header//nav")
    if nav and not body.xpath(".//header//a[contains(concat(' ', normalize-space(@class), ' '), ' fluidrwa-language-switch ')]"):
        switch = html.Element("a", href=english_url, hreflang="en", lang="en")
        switch.set("class", "fluidrwa-language-switch")
        switch.text = "English"
        nav[0].append(switch)
    output_path = OUTPUT / f"{local_path(route)}.html"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    rendered = "<!doctype html>\n" + html.tostring(document, encoding="unicode", method="html")
    rendered = "\n".join(line.rstrip() for line in rendered.splitlines()) + "\n"
    output_path.write_text(rendered, encoding="utf-8")
    return output_path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("extract", "translate", "apply"))
    parser.add_argument("--route", choices=tuple(SOURCES), help="Process one route; omit for all ten")
    parser.add_argument("--force", action="store_true", help="Rebuild existing translations")
    args = parser.parse_args()
    WORK.mkdir(parents=True, exist_ok=True)
    for route in [args.route] if args.route else SOURCES:
        stem = local_path(route)
        input_path = WORK / f"{stem}.input.json"
        translated_path = WORK / f"{stem}.translated.json"
        if args.mode == "extract":
            values = segments(document_for(route))
            input_path.write_text(json.dumps(values, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"{route}: {len(values)} text segments")
        elif args.mode == "translate":
            values = json.loads(input_path.read_text(encoding="utf-8"))
            existing = {} if args.force or not translated_path.exists() else json.loads(translated_path.read_text(encoding="utf-8"))
            if args.force and translated_path.exists():
                translated_path.unlink()

            def checkpoint(mapping):
                temporary = translated_path.with_suffix(".tmp")
                temporary.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8")
                temporary.replace(translated_path)

            translated = translate(values, existing, checkpoint)
            print(f"{route}: translated {len(translated)} text segments")
        else:
            translations = json.loads(translated_path.read_text(encoding="utf-8"))
            print(apply_document(route, translations))


if __name__ == "__main__":
    main()
