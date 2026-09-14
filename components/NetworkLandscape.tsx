"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  useReactFlow,
  useNodesState,
  Node,
  NodeProps,
  Edge,
  MarkerType,
} from "@xyflow/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CircleHelp,
  Focus,
  Globe2,
  Layers3,
  Maximize,
  Minus,
  Plus,
  Route,
  CircleAlert,
  X,
} from "lucide-react";
import {
  Entity,
  activeRelationships,
  entities,
  layers,
  relatedEntities,
  selectNetwork,
} from "@/lib/network-preview";
import "@xyflow/react/dist/style.css";
import s from "./NetworkLandscape.module.css";

type MapData = {
  label: string;
  entity?: Entity;
  kind: "hub" | "company" | "detail";
  caption?: string;
  color: string;
  number?: string;
  onChoose: (id: string) => void;
  target: string;
  dim?: boolean;
  lit?: boolean;
};
type MapNode = Node<MapData, "intelligence">;
const lookup = (id: string) => entities.find((e) => e.id === id);
const blockchainCategory: Entity = {
  id: "blockchains",
  name: "Blockchain infrastructure",
  slug: "blockchains",
  entity_type: "Category",
  short_description: "Settlement and execution networks.",
  website: null,
  profile_url: null,
  image: null,
  verification_status: "sample",
  created_at: "2026-09-10",
  updated_at: "2026-09-10",
  active: true,
};
const colorFor = (id: string) =>
  layers.find((l) => l.id === id)?.color || "#598b9b";
function IntelligenceNode({ data }: NodeProps<MapNode>) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`${s.node} ${s[data.kind]} ${data.dim ? s.dim : ""} ${data.lit ? s.lit : ""}`}
      style={{ "--node-color": data.color } as React.CSSProperties}
    >
      {[Position.Left, Position.Right, Position.Top, Position.Bottom].map(
        (p, i) => (
          <span key={p}>
            <Handle
              type="source"
              position={p}
              id={`s${i}`}
              isConnectable={false}
            />
            <Handle
              type="target"
              position={p}
              id={`t${i}`}
              isConnectable={false}
            />
          </span>
        ),
      )}
      <button
        className="nodrag"
        onClick={() => data.onChoose(data.target)}
        aria-label={`${data.kind === "hub" ? "Explore" : "Inspect"} ${data.label}`}
      >
        {data.kind === "hub" ? (
          <>
            <span className={s.hubIndex}>{data.number || "LAYER"}</span>
            <strong>{data.label}</strong>
            <ArrowUpRight size={15} />
            <small>{data.caption}</small>
          </>
        ) : (
          <>
            <span className={s.nodeLogo}>
              {data.entity?.image && !failed ? (
                <img
                  alt={`${data.label} logo`}
                  src={data.entity.image}
                  onError={() => setFailed(true)}
                />
              ) : data.entity?.entity_type === "Region" ? (
                <Globe2 size={19} />
              ) : data.entity?.entity_type === "Category" ? (
                <Layers3 size={19} />
              ) : (
                <Building2 size={19} />
              )}
            </span>
            <span>
              <strong>{data.label}</strong>
              <small>{data.caption || data.entity?.entity_type}</small>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
const nodeTypes = { intelligence: IntelligenceNode };
const zonePositions: Record<string, [number, number]> = {
  issuers: [20, 75],
  tokenization: [325, 45],
  compliance: [630, 70],
  blockchains: [950, 115],
  custody: [950, 345],
  oracles: [850, 595],
  distribution: [635, 325],
  stablecoins: [325, 350],
  defi: [20, 320],
};
const phaseNames: Record<string, string> = {
  issuers: "Originate",
  tokenization: "Structure",
  compliance: "Verify",
  blockchains: "Settle",
  custody: "Safeguard",
  oracles: "Inform",
  distribution: "Distribute",
  stablecoins: "Pay",
  defi: "Put capital to work",
};
const workflow = [
  "issuers",
  "tokenization",
  "compliance",
  "blockchains",
  "custody",
  "oracles",
  "distribution",
  "stablecoins",
  "defi",
];

export function NetworkLandscape(props: {
  data: ReturnType<typeof selectNetwork>;
  category: string;
  selected: string;
  analytical?: boolean;
  onChoose: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <ReactFlowProvider>
      <LandscapeCanvas {...props} />
    </ReactFlowProvider>
  );
}
function LandscapeCanvas({
  data,
  category,
  selected,
  analytical = false,
  onChoose,
  onReset,
}: Parameters<typeof NetworkLandscape>[0]) {
  const flow = useReactFlow<MapNode>();
  const [hovered, setHovered] = useState("");
  const [zoom, setZoom] = useState(1);
  const [help, setHelp] = useState(false);
  const [edgeDetail, setEdgeDetail] = useState<Edge | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);
  const picked = lookup(selected);
  const categoryRecord =
    lookup(category) ||
    (category === "blockchains" ? blockchainCategory : undefined);
  const highlighted = selected || hovered;
  const highlightedEntity = lookup(highlighted);
  const focusCompany =
    picked?.entity_type === "Company"
      ? picked
      : analytical
        ? data.companies[0]
        : undefined;
  const neighbors = useMemo(
    () =>
      new Set(
        highlighted
          ? [highlighted, ...relatedEntities(highlighted).map((e) => e.id)]
          : [],
      ),
    [highlighted],
  );
  const layout = useMemo(() => {
    const nodes: MapNode[] = [];
    const edges: Edge[] = [];
    const visibleIds = new Set<string>();
    function add(
      id: string,
      x: number,
      y: number,
      kind: MapData["kind"],
      label: string,
      caption?: string,
      color = "#608f8e",
      entity?: Entity,
      number?: string,
      target = id,
    ) {
      if (visibleIds.has(id)) return;
      visibleIds.add(id);
      nodes.push({
        id,
        type: "intelligence",
        position: { x, y },
        data: { label, caption, color, kind, entity, number, target, onChoose },
        draggable: kind !== "hub",
        selectable: false,
        width: kind === "hub" ? 250 : kind === "company" ? 144 : 170,
        height: kind === "hub" ? 62 : 64,
      });
    }
    if (categoryRecord || focusCompany) {
      const centre = focusCompany || categoryRecord!;
      add(
        centre.id,
        550,
        245,
        focusCompany ? "company" : "hub",
        centre.name,
        focusCompany ? "Selected company" : "Category focus",
        colorFor(centre.id),
        centre,
        "RWA",
      );
      const companies = focusCompany
        ? data.companies
            .filter(
              (e) =>
                e.id !== centre.id &&
                relatedEntities(e.id, "Category").some((c) =>
                  relatedEntities(centre.id, "Category").some(
                    (n) => n.id === c.id,
                  ),
                ),
            )
            .slice(0, 4)
        : category === "blockchains"
          ? data.nodes.filter((e) => e.entity_type === "Blockchain")
          : data.companies;
      companies.forEach((e, i) =>
        add(
          e.id,
          300 + (i % 3) * 195,
          75 + Math.floor(i / 3) * 90,
          e.entity_type === "Blockchain" ? "detail" : "company",
          e.name,
          focusCompany
            ? "Same-category provider"
            : e.entity_type === "Blockchain"
              ? "Settlement network"
              : "Provider",
          colorFor(category || relatedEntities(e.id, "Category")[0]?.id),
          e,
        ),
      );
      const connections = focusCompany
        ? relatedEntities(centre.id)
        : category === "blockchains"
          ? data.companies
          : data.nodes.filter((e) => e.entity_type !== "Company");
      const types = ["Asset Class", "Blockchain", "Region", "Category"];
      types.forEach((type, index) => {
        const members = connections
          .filter((e) => e.entity_type === type && e.id !== centre.id)
          .slice(0, 4);
        const x =
          index === 0 ? 20 : index === 1 ? 1050 : index === 2 ? 355 : 735;
        const y = index < 2 ? 120 : 470;
        members.forEach((e, i) =>
          add(
            e.id,
            x + (index < 2 ? 0 : (i % 2) * 190),
            y + (index < 2 ? i * 90 : Math.floor(i / 2) * 90),
            "detail",
            e.name,
            type,
            "#658998",
            e,
          ),
        );
      });
    } else {
      layers.forEach((layer, index) => {
        const [x, y] = zonePositions[layer.id];
        const members =
          layer.id === "blockchains"
            ? data.nodes.filter((e) => e.entity_type === "Blockchain")
            : data.companies.filter((e) =>
                relatedEntities(e.id, "Category").some(
                  (c) => c.id === layer.id,
                ),
              );
        add(
          layer.id,
          x,
          y,
          "hub",
          layer.name,
          `${phaseNames[layer.id]} · ${members.length} ${layer.id === "blockchains" ? "networks" : members.length === 1 ? "company" : "companies"}`,
          layer.color,
          lookup(layer.id),
          String(index + 1).padStart(2, "0"),
          layer.id,
        );
        members
          .slice(0, 2)
          .forEach((e, i) =>
            add(
              e.id,
              x + i * 155,
              y + 78,
              "company",
              e.name,
              members.length > 2
                ? `${members.length} total · open layer`
                : undefined,
              layer.color,
              e,
            ),
          );
      });
      data.nodes
        .filter((e) => e.entity_type === "Asset Class")
        .forEach((e, i) =>
          add(
            e.id,
            10 + i * 200,
            -35,
            "detail",
            e.name,
            "Underlying asset",
            "#977056",
            e,
          ),
        );
      workflow.slice(1).forEach((id, i) => {
        const prev = workflow[i];
        const forward = i < 3;
        edges.push({
          id: `workflow:${prev}:${id}`,
          source: prev,
          target: id,
          sourceHandle: i === 3 ? "s3" : forward ? "s1" : "s0",
          targetHandle: i === 3 ? "t2" : forward ? "t0" : "t1",
          type: "smoothstep",
          style: {
            stroke: "#7eaba7",
            strokeWidth: 1.5,
            strokeDasharray: "6 6",
            opacity: 0.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#7eaba7",
            width: 13,
            height: 13,
          },
          zIndex: 0,
        });
      });
      data.nodes
        .filter((e) => e.entity_type === "Asset Class")
        .forEach((e) =>
          edges.push({
            id: `workflow:asset:${e.id}`,
            source: e.id,
            target: "issuers",
            sourceHandle: "s3",
            targetHandle: "t2",
            type: "default",
            style: {
              stroke: "#b4a58b",
              strokeWidth: 1,
              strokeDasharray: "4 5",
              opacity: 0.35,
            },
          }),
        );
    }
    // Only entity edges from the shared dataset are used for relationship highlighting.
    if (highlighted || categoryRecord || focusCompany) {
      activeRelationships
        .filter(
          (r) =>
            visibleIds.has(r.source_entity_id) &&
            visibleIds.has(r.target_entity_id) &&
            (highlighted
              ? r.source_entity_id === highlighted ||
                r.target_entity_id === highlighted
              : true),
        )
        .forEach((r) => {
          const source = nodes.find((n) => n.id === r.source_entity_id)!,
            target = nodes.find((n) => n.id === r.target_entity_id)!;
          const down = target.position.y > source.position.y + 80;
          edges.push({
            id: r.relationship_id,
            source: r.source_entity_id,
            target: r.target_entity_id,
            sourceHandle: down
              ? "s3"
              : target.position.x > source.position.x
                ? "s1"
                : "s0",
            targetHandle: down
              ? "t2"
              : target.position.x > source.position.x
                ? "t0"
                : "t1",
            type: "default",
            style: {
              stroke:
                r.verification_status === "verified" ? "#187d69" : "#5a8da7",
              strokeWidth: highlighted ? 2.2 : 1,
              opacity: highlighted?.length ? 0.95 : 0.22,
              strokeDasharray:
                r.verification_status === "sample" ? "5 4" : undefined,
            },
            zIndex: 2,
          });
        });
    }
    if (mobile) {
      if (!categoryRecord && !focusCompany) {
        const mobileLayers = layers;
        nodes.forEach((n) => {
          const index = mobileLayers.findIndex((l) => l.id === n.id);
          if (index >= 0) n.position = { x: 25, y: 155 + index * 185 };
          else if (n.data.entity?.entity_type === "Asset Class") {
            const i = nodes
              .filter((x) => x.data.entity?.entity_type === "Asset Class")
              .findIndex((x) => x.id === n.id);
            n.position = {
              x: 10 + (i % 2) * 180,
              y: -10 + Math.floor(i / 2) * 75,
            };
          } else {
            const layerId = relatedEntities(n.id, "Category")[0]?.id;
            const layer =
              n.data.entity?.entity_type === "Blockchain"
                ? "blockchains"
                : layerId;
            const i = mobileLayers.findIndex((l) => l.id === layer);
            const siblings = nodes.filter(
              (x) =>
                x.data.kind === "company" &&
                (x.data.entity?.entity_type === "Blockchain"
                  ? layer === "blockchains"
                  : relatedEntities(x.id, "Category").some(
                      (c) => c.id === layer,
                    )),
            );
            n.position = {
              x:
                25 +
                Math.max(
                  0,
                  siblings.findIndex((x) => x.id === n.id),
                ) *
                  155,
              y: 230 + Math.max(0, i) * 185,
            };
          }
        });
      } else {
        const centreId = focusCompany?.id || categoryRecord?.id;
        let i = 0;
        nodes.forEach((n) => {
          if (n.id === centreId) n.position = { x: 85, y: 100 };
          else {
            n.position = {
              x: 10 + (i % 2) * 185,
              y: 240 + Math.floor(i / 2) * 100,
            };
            i++;
          }
        });
      }
    }
    return { nodes, edges };
  }, [data, categoryRecord, focusCompany, highlighted, onChoose, mobile]);
  const [nodes, setNodes, onNodesChange] = useNodesState<MapNode>([]);
  const previousLayout = useRef("");
  const layoutKey = [
    category,
    focusCompany?.id,
    data.companies.map((e) => e.id).join(","),
    mobile,
  ].join(":");
  useEffect(() => {
    const preservePositions = previousLayout.current === layoutKey;
    setNodes((prev) =>
      layout.nodes.map((n) =>
        preservePositions
          ? {
              ...n,
              position: prev.find((p) => p.id === n.id)?.position || n.position,
            }
          : n,
      ),
    );
    previousLayout.current = layoutKey;
  }, [layout.nodes, layoutKey, setNodes]);
  useEffect(() => {
    const id = setTimeout(
      () =>
        mobile
          ? flow.setViewport({ x: 12, y: 55, zoom: 0.88 }, { duration: 250 })
          : flow.fitView({
              padding: mobile ? 0.1 : 0.09,
              duration: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? 0
                : 550,
              maxZoom: mobile ? 0.8 : 1,
            }),
      100,
    );
    return () => clearTimeout(id);
  }, [layoutKey, flow, mobile]);
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver((entries) => {
      setMobile(entries[0].contentRect.width < 600);
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const styledNodes = nodes.map((n) => ({
    ...n,
    data: {
      ...n.data,
      dim:
        !!highlighted &&
        !!lookup(highlighted) &&
        !neighbors.has(n.id) &&
        n.id !== category,
      lit: highlighted === n.id || neighbors.has(n.id),
    },
  }));
  const contextCompany =
    highlightedEntity?.entity_type === "Company"
      ? highlightedEntity
      : undefined;
  const selectedRelationship = edgeDetail
    ? activeRelationships.find((r) => r.relationship_id === edgeDetail.id)
    : undefined;
  const relationshipSource = selectedRelationship
    ? lookup(selectedRelationship.source_entity_id)
    : undefined;
  const relationshipTarget = selectedRelationship
    ? lookup(selectedRelationship.target_entity_id)
    : undefined;
  const count = (type: string) =>
    data.nodes.filter((e) => e.entity_type === type).length;
  const verifiedCount = data.edges.filter(
    (relationship) => relationship.verification_status === "verified",
  ).length;
  return (
    <div ref={container} className={s.shell}>
      <div className={s.canvasHead}>
        <div>
          <span className={s.liveMark} />
          <strong>
            {focusCompany
              ? `${focusCompany.name} / Relationships`
              : categoryRecord
                ? `${categoryRecord.name} / Infrastructure`
                : "RWA / Capital & infrastructure flow"}
          </strong>
        </div>
        {(category || focusCompany) && (
          <button onClick={onReset}>
            <ArrowLeft size={13} />
            Full landscape
          </button>
        )}
        <span className={s.sample}>SAMPLE DATA</span>
        {mobile && (
          <select
            className={s.jump}
            aria-label="Jump to infrastructure layer"
            value={category || ""}
            onChange={(e) =>
              e.target.value ? onChoose(e.target.value) : onReset()
            }
          >
            <option value="">Full landscape</option>
            {layers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={s.stage}>
        <ReactFlow<MapNode>
          nodes={styledNodes}
          edges={layout.edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.8}
          nodesConnectable={false}
          edgesFocusable={false}
          deleteKeyCode={null}
          panOnDrag
          zoomOnPinch
          onMove={(_, v) => setZoom(v.zoom)}
          onNodeMouseEnter={(_, n) => {
            if (n.data.entity?.entity_type === "Company") setHovered(n.id);
          }}
          onNodeMouseLeave={() => setHovered("")}
          onPaneClick={() => setHovered("")}
          onEdgeClick={(_, edge) => setEdgeDetail(edge)}
          aria-label="Interactive RWA capital flow"
          defaultEdgeOptions={{ interactionWidth: 18 }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={28}
            size={0.7}
            color="#94aca64d"
          />
        </ReactFlow>
        <div className={s.canvasTools}>
          <button
            title="Zoom in"
            aria-label="Zoom in"
            onClick={() => flow.zoomIn({ duration: 200 })}
          >
            <Plus size={17} />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            title="Zoom out"
            aria-label="Zoom out"
            onClick={() => flow.zoomOut({ duration: 200 })}
          >
            <Minus size={17} />
          </button>
          <i />
          <button
            title="Fit landscape"
            aria-label="Fit landscape"
            onClick={() => flow.fitView({ padding: 0.1, duration: 400 })}
          >
            <Maximize size={16} />
          </button>
          <button
            title="Relationship legend"
            aria-label="Relationship legend"
            aria-pressed={help}
            onClick={() => setHelp(!help)}
          >
            <CircleHelp size={16} />
          </button>
        </div>
        {help && (
          <div className={s.legend}>
            <h3>Reading this landscape</h3>
            <p>
              <i />
              Green dashed paths show an illustrative workflow, not company
              partnerships.
            </p>
            <p>
              <i />
              Blue dashed connections are sample relationships. No relationships
              in this prototype are verified.
            </p>
            <p>
              Companies in the same layer are alternatives, not necessarily
              integrations.
            </p>
          </div>
        )}
        {edgeDetail && (
          <aside className={s.edgeEvidence} aria-label="Connection evidence">
            <div>
              <span>CONNECTION DETAILS</span>
              <button
                aria-label="Close connection details"
                onClick={() => setEdgeDetail(null)}
              >
                <X size={15} />
              </button>
            </div>
            <strong>
              {selectedRelationship
                ? `${relationshipSource?.name} → ${relationshipTarget?.name}`
                : "Conceptual workflow step"}
            </strong>
            <p>
              {selectedRelationship
                ? selectedRelationship.relationship_type.replaceAll("_", " ")
                : "This path explains a typical RWA workflow. It does not claim that the connected companies integrate or partner."}
            </p>
            <span className={s.pendingEvidence}>
              <CircleAlert size={13} />
              {selectedRelationship
                ? "Illustrative mapping · source not yet added"
                : "Conceptual path · not a company relationship"}
            </span>
          </aside>
        )}
        {!data.total && (
          <div className={s.empty}>
            <SearchFallback />
            <h3>No matching companies</h3>
            <button onClick={onReset}>Reset landscape</button>
          </div>
        )}
      </div>
      <div className={s.insightBar}>
        {contextCompany ? (
          <>
            <span className={s.insightIcon}>
              <Focus size={20} />
            </span>
            <div>
              <strong>{contextCompany.name}</strong>
              <p>
                {relatedEntities(contextCompany.id, "Category")
                  .map((e) => e.name)
                  .join(" · ")}{" "}
                infrastructure
              </p>
            </div>
            <div className={s.insightMetric}>
              <b>{relatedEntities(contextCompany.id, "Blockchain").length}</b>
              <span>networks</span>
            </div>
            <div className={s.insightMetric}>
              <b>{relatedEntities(contextCompany.id, "Asset Class").length}</b>
              <span>asset classes</span>
            </div>
            <div className={s.insightMetric}>
              <b>{relatedEntities(contextCompany.id, "Region").length}</b>
              <span>markets</span>
            </div>
            <small>
              Sample connections
              <br />
              Evidence pending
            </small>
          </>
        ) : (
          <>
            <span className={s.insightIcon}>
              <Route size={21} />
            </span>
            <div>
              <strong>
                {categoryRecord
                  ? `Inside ${categoryRecord.name}`
                  : "From real assets to on-chain capital"}
              </strong>
              <p>
                {categoryRecord
                  ? `${data.total} companies across ${count("Blockchain")} networks and ${count("Region")} markets in this sample.`
                  : "Origination → issuance → settlement → access → liquidity"}
              </p>
            </div>
            <span className={s.truth}>
              <CircleAlert size={14} />
              {verifiedCount} verified relationships
            </span>
          </>
        )}
      </div>
    </div>
  );
}
function SearchFallback() {
  return <Globe2 size={26} />;
}
