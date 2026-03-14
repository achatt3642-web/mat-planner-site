# UI Wireframe (Orthopaedic Planning Style)

## Layout

- Left pane: case inputs and workflow controls
- Right pane: interactive 3D viewport + output artifacts
- Bottom strip: report/download status

## Functional blocks

```mermaid
flowchart LR
  A["Input MRI (DICOM/NIfTI)"] --> B["Bone Segmentation Router"]
  B --> C["Bone Masks (Femur/Tibia)"]
  C --> D["3D CNN Meniscus Size Predictor"]
  D --> E["Horn Landmark Estimator"]
  C --> F["3D Mesh Renderer"]
  D --> F
  E --> F
  F --> G["Interactive Planning View"]
  D --> H["PDF/JSON Report Generator"]
  E --> H
```

## Viewer toggles

- Femur mesh
- Tibia mesh
- Meniscus allograft overlay
- Horn landmarks
- Measurements (from legend/text overlays)

