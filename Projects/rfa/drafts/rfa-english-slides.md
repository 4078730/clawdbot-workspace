# Robotics Foundation Agent - English Slide Text

## Slide 1: Title
**Robotics Foundation Agent**
Toward Autonomous Task Execution with Embodied AI

R&D Division
Panasonic Connect Co., Ltd.

---

## Slide 2: Expanding Automation Scope in Robot Control Platform
From storage & picking to receiving & shipping — extending the range of automatable operations

| Phase | Area | Tasks |
|-------|------|-------|
| **Receiving** | Inbound | Goods reception, Inspection, Stocking to automated warehouse |
| **Storage** | Warehouse | Storage, Picking |
| **Shipping** | Outbound | Sorting & dispatch, Packing, Shipment |

- **~FY25**: Storage & Picking (current scope)
- **FY27**: Expanding to Receiving & Shipping

---

## Slide 3: Challenges in Robot Automation for Supply Chain Operations
Achieving autonomy through data-driven learning for tasks previously requiring human judgment

### SCM Site Automation Challenges
- Continuous non-routine tasks
- Daily changing product mix
- Diverse shapes and materials
- Reliance on human tacit knowledge

### Robot Deployment Challenges
- Requires programming and teaching

### Embodied AI Solution
**"Thinking Ability"** — Language
**"Seeing Ability"** — Vision
**"Acting Ability"** — Action

→ **Autonomy**

---

## Slide 4: Embodied AI Transforming Robotics
The realization of AI capable of autonomous action in the physical world is accelerating globally

### Technology Evolution Timeline
| Year | Milestone | Significance |
|------|-----------|--------------|
| 2022 | ChatGPT | - |
| 2023 | GPT-4V | Vision-Language Integration |
| 2024 | VLA | Extension to Physical World |

### Global Technology Trend: Embodied AI
- **GR00T** @NVIDIA
- **π0** @Physical Intelligence

### Conventional Robots
- Rule-based control

### Next Generation
- Intelligence acquisition in physical world through generative AI

**Key Insight: AI models themselves are becoming commoditized — "Field Data" becomes the source of differentiation**

---

## Slide 5: Vision-Language-Action AI Models
Pre-training on massive amounts of text, images, videos, and robot/object motion scenes

### Training Data Sources
| Type | Content | Challenge |
|------|---------|-----------|
| **Language** | Massive text data | Domain-specific data is insufficient |
| **Vision** | Massive images and videos | - |
| **Action** | Massive robot/object motion scenes | Robot action data is insufficient |

→ **Robot Foundation Model**

---

## Slide 6: Our Data Strategy
We fine-tune VLA with teleoperated, behavior-cloned robot actions, and will further strengthen it using RoboSync field data, simulation, and video imitation.

### Robot AI Data Sources

| Source | Characteristics | Usage |
|--------|-----------------|-------|
| **Human Teleoperation** | Most Valuable, High Cost | Fine-Tune |
| **Robo Sync (Field Data)** | Teleoperation | Deploy → Continuously Improve |
| **Synthetic Data (Simulation)** | Scalable, Sim-to-real Gap | Augment |
| **Human Videos (Egocentric)** | Abundant, Embodiment Gap | Convert |

**Target: Autonomous Robot Control for Supply Chain**

---

## Slide 7: Project Overview — Robotics Foundation Agent (RFA)
An intelligent system that connects language instructions to physical robot actions, autonomously completing tasks

### Architecture

**1. Task Planning Hub (LLM Agent)**
- Language understanding, task planning, reasoning, failure recovery

**2. Symbol Hub (Symbol Integration)**
- Language-physical symbol grounding, state recognition via VLM

**3. Sensorimotor Hub (VLA)**
- Action generation from visual information, complex non-routine control

**4. Robo Sync + Data Platform**
- Physical robot execution platform, safety control, data collection & management

### Target State
- **Natural language instructions**: Language understanding, task planning, reasoning, failure recovery
- **Autonomous AI decision-making**: Recognizes situations, automatically selects optimal procedures
- **Resilient execution and evolution**: Automatic retry on failure, data accumulates, system becomes smarter with use

---

## Slide 8: Next-Generation Robot Control with Vision-Language-Action Models

### Key Points
- Learning AI models from data to autonomously execute non-routine, human-dependent tasks that cannot be fully captured by rules
- Collecting robot data and fine-tuning generative AI models for rapid environmental adaptation
- Planned integration with Robo Sync in the near term — to be offered as an "teach today, run tomorrow" automation AI package

### Before: Rule-Based Control
- Movement only to predetermined coordinates
- Vulnerable to environmental changes
- Requires stoppage and intervention upon failure

### After: VLA Learning-Based Control
- Adaptive operation based on situational awareness
- Flexible manipulation of complex-shaped objects
- Autonomous failure recognition and recovery

### VLA Multi-Stage Control for Shaver Packing
(Demo video reference)

### Robo Sync × VLA Integration Vision
Aiming to create a cycle where field data is continuously collected through Robo Sync (Robot Control Platform) to grow the AI model

Robot → Data Collection → VLA Training → Inference/Control → (cycle continues)

*This demo uses the following open-source technologies: "SO-101 open-source robot platform" (Apache License 2.0), "π0 Vision-Language-Action model" (Apache License 2.0, Gemma Terms of Use), "LeRobot robotics library" (Apache License 2.0)*

---

## Slide 9: Shaver Packing VLA Demo
(Video slide)

---

## Slide 10: Demo — Robot Foundation Model for Adaptive Manipulation

### Point ① Adaptation to Diverse Conditions
Even for complex objects that are difficult with conventional rule-based approaches, the system understands on-site changes and determines actions in real-time

- Complex-shaped objects
- Objects changing shapes

### Point ② Autonomous Failure Recovery
Even when mistakes or disturbances occur, automatic recovery on-site

---

## Slide 11: RFA Functional Block Diagram (FY26 Target State)

### User Input
- Natural language instructions
- Dialog input

### Task Planning Hub
*Understanding natural language instructions, planning, and autonomously combining skills*

**LLM Agent**
- User dialog management
- MCP connection & operation

Components:
- **Task Understanding**: Intent interpretation, constraint extraction, goal setting
- **Plan Generation**: Subtask decomposition, sequencing, Behavior Tree
- **Skill Alignment**: VLA/rule-based selection, task scenario construction
- **Re-Plan**: Plan modification on failure, recovery control

### Symbol Hub
*Semantic space management, transformation/grounding — understanding "what," "where," and "what state"*

**VLM**
- State recognition
- Success/failure monitoring
- Language → Index conversion

**Symbol Manager**
- Task progress/state management
- Index/Affordance management
- VLA skill set management

**Context Memory**
- Past experience accumulation
- Knowledge reference

### Sensorimotor Hub
*Sensorimotor intelligence — generating and executing "how to move"*

**Action Executor**
- Robot control generation
- Safety control check

**VLA Policy**
- Integrated control of vision, language, and physical action

Recovery from failure: Human-In-Loop

### Data Sources
| Source | Description |
|--------|-------------|
| Human-Data | Teleoperation data, HIL teaching data |
| Field | Robo Sync, Ego-Centric |
| Synthetic | Sim data, World models |

### Continuous Learning Pipeline
- Data Conversion: RLDS, LeRobot format, Annotation
- Model Training: Fine-Tuning, Reinforcement Learning
- Infrastructure: Azure

---

## Slide 12: VLA Autonomous Packing Demo Exhibited at International Robot Exhibition

### Overview
- Exhibited a technology demo at iREX 2025 showcasing multi-stage packing operations executed autonomously using Vision-Language-Action (VLA) models while recognizing situations
- Demonstrated a robot that packs complex products into boxes, with AI determining tasks and switching between skills
- Targeting human-dependent tasks difficult to handle with rule-based approaches, presenting the direction of foundational technology aimed at future field validation and Robo Sync integration

### Technical Highlights

**Situational Recognition and Autonomous Decision-Making**
- VLM analyzes images to determine "which skill should be used next" and executes accordingly
- VLA handles complex control

**Realistic Learning Costs**
- 90 minutes of data collection per skill, 1 day of training for deployment
- Confirmed feasibility for field deployment

**Integration with Robo Sync**
- Aiming to create a cycle where field data is continuously collected to grow the AI model

### Exhibition Response

**Manufacturing**
"How could we use this in our facility?" — Consultations on specific practical applications

**Tech/Robotics**
"We definitely want to deploy this once Robo Sync integration is complete"

**Media**
Featured in MONOist. High attention as Physical AI.

---

## Slide 13: Future Roadmap

| Phase | Timeline | Goals |
|-------|----------|-------|
| **Technology Validation** | FY25 | VLA × Agent technology establishment |
| **Internal Validation & Integration** | FY26 | VLA validation experiments at internal factories, Complete VLA integration with Robo Sync |
| **Commercial Deployment** | FY27 | Release as commercial package, Target application to SCM packing operations and manufacturing lines |
