import { canvasRecorder } from "canvas-recorder-lib";
import { affineTransforms } from "./affine-transforms.ts";

// Don't await this.  See canvasRecorder.start().
canvasRecorder.start(affineTransforms, { name: "affine-transforms" });
