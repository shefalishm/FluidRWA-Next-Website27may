---
title: "Google Cloud vs Azure vs AWS: Confidential AI Inference Controls"
description: "Compare what each cloud documents about isolation and attestation, and what to verify before releasing sensitive model inputs."
date: "2026-11-15"
reviewedDate: "2026-11-15"
reviewedLabel: "November 15, 2026"
reviewedBy: "FluidRWA Research Team"
category: "AI"
slug: "google-cloud-vs-azure-vs-aws-confidential-ai-inference"
image: "/assets/blog-thumbnails/google-cloud-vs-azure-vs-aws-confidential-ai-inference.webp"
imageAlt: "FluidRWA comparison illustration: a GPU workload and a verification checkpoint"
answer: "Google Cloud and Azure document specific confidential GPU VM configurations. AWS describes Nitro-based isolation and EC2 instance attestation. These are different kinds of evidence. Ask each cloud to show which CPU, GPU and boot measurements a verifier can check for the exact workload before you release confidential material."
readerFirst: "true"
considerationAfterTable: "true"
ctaTitle: "Evaluating providers for your project?"
ctaText: "Share the workflow and requirements you need to verify, or email contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "Does confidential computing prove an AI service is secure or compliant?"
faq1a: "No. It provides specific technical protections under a defined model. Data handling, operational access, application defects, regional obligations and recovery still need separate evaluation."
---

An inference service may receive a contract, a medical note or an unreleased filing. Encrypting storage and transport still leaves a question about when the service can read that input and who can verify the environment it runs in. The useful comparison begins with the boundaries of the particular deployment, not a generic cloud capability label.

## Side-by-side comparison

| Provider | What the provider documents | Source |
| --- | --- | --- |
| Google Cloud | Google documents Confidential VM deployment with a supported GPU, including A3 High with NVIDIA H100 and Intel TDX. | [Official documentation](https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance-with-gpu) |
| Microsoft Azure | Azure documents confidential GPU options including NCCadsH100v5-series VMs using AMD SEV-SNP and NVIDIA H100 GPUs. | [Official documentation](https://learn.microsoft.com/en-us/azure/confidential-computing/gpu-options) |
| AWS | AWS describes its Nitro isolation model and NitroTPM-based instance attestation. Those claims do not by themselves establish an equivalent GPU attestation workflow. | [Official documentation](https://aws.amazon.com/confidential-computing/) |

## Google Cloud: What to verify

Verify the documented machine type and image in your intended region, then ask for evidence of confidential GPU mode in the actual deployment. Follow how guest CPU and accelerator measurements are checked. A screenshot of a VM type is not attestation evidence.

## Microsoft Azure: What to verify

Pin the instance family and qualifying image before the proof of concept. Ask for the guest and GPU evidence, the verification mechanism and the procedure when the qualified image changes. Test your model-serving dependencies under the exact image that will run production.

## AWS: What to verify

Ask what exact GPU and supporting software are in scope, what the verifier receives and whether your control requires evidence AWS has not documented for the proposed setup. Keep AWS in the evaluation if its documented model meets your threat assumptions; do not substitute instance attestation for GPU evidence.

## Run the same acceptance test with each option

| Scenario | Passing evidence to ask for |
| --- | --- |
| Approved workload starts | The release service records the verification result for the approved image and accelerator along with the policy version. |
| Candidate image changes | The workload must go through the agreed approval procedure. Sensitive data stays withheld when measurements fail policy. |
| Service restarts or moves | The new instance is verified independently. Cached success does not silently authorize an unverified destination. |
| Model finishes but telemetry is enabled | The team demonstrates which input, output and error data can leave the protected path and who can access it. |

## What to include in the buyer brief

Draw the full input path from the customer to the output store. Mark TLS termination, queue, preprocessing, accelerator, postprocessing and telemetry. A protected accelerator cannot fix an upstream queue that stores the same document in plaintext. Assign each hop an owner, and document exactly which party or component your proposal assumes is trusted. Independently verify the results where your policy requires it. Measure latency and throughput in your own approved pilot; we did not test any providers.

## Turn the threat model into a purchasing requirement

Write down who can see the workload at each stage and whose access you want to prevent. For one team the concern may be the underlying cloud operator; for another it may be accidental logging by its own application. Those problems require different evidence. A verifier can assess specific measurements; it cannot tell you whether a reviewer was given too much access in your own portal.

Ask for a diagram that names the component verifying each measurement and the party controlling the approval policy. Then describe what happens during an image upgrade. Freeze the approved combination for the pilot, but make the upgrade exercise part of acceptance. A system that works only when nobody changes the image is not ready for a regular patch cycle.

## Test the rest of the request path

Use a synthetic document first. Trace it from upload to deletion, including failed requests and debugging. Inspect the request queue, temporary objects, model logs and result store under the intended access roles. Have someone show that a failed verification keeps material out of the workload and produces a useful alert without duplicating its content into logs.

Run performance and recovery exercises separately from the security check. Record useful latency and capacity under your workload, the regions that can support it, and whether a failover target can meet the same policy. Do not let a fast but unapproved fallback carry confidential requests simply because the approved region is unavailable.

## Scope of this comparison

The providers were selected because they offer different documented approaches to this workflow. The table uses official product documentation checked on November 15, 2026. The acceptance tests are FluidRWA's recommendations, not completed tests. Pricing, contractual terms and results in a particular deployment were not verified.
