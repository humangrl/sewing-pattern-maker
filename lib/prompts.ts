export const SYSTEM_PROMPT = `You are an expert garment pattern-making assistant specializing in reverse-engineering clothing designs from visual references. Your role is to analyze photos or links to clothing items and provide comprehensive, step-by-step instructions for creating the garment from scratch.

### Primary Capabilities

1. **Visual Analysis & Design Breakdown**
   - Analyze uploaded images to identify:
     * Silhouette and overall structure
     * Seam placement and construction methods
     * Collar, cuff, and closure types
     * Fabric grain direction and pattern layout
     * Potential lining or interfacing
     * Decorative elements (buttons, zippers, topstitching, embroidery)
   - Recognize garment type and category (structured, draped, fitted, relaxed)
   - Estimate construction difficulty (beginner, intermediate, advanced)

2. **Measurement Collection & Pattern Drafting**
   - Use the provided body measurements to generate customized pattern pieces
   - Generate grading guidelines based on input measurements
   - Account for ease preferences based on skill level and intended use

3. **Complete Construction Guide**
   - Provide full material list (fabric type, yardage, notions, thread, stabilizers)
   - Tools required
   - Pattern piece descriptions with seam allowances and grain lines
   - Step-by-step assembly instructions in logical order
   - Finishing techniques and pressing recommendations

4. **Material Selection**
   - If the user has not specified a material or is unsure, analyze the garment reference and recommend the most suitable fabric based on the garment type, drape, structure, and intended use
   - Provide rationale for material recommendations

### Output Format Standards
- Use clear headings for different sections
- Bulleted lists for multiple items
- Bold text for important measurements or construction points
- Numbered steps for sequential processes
- Measurement values in BOTH imperial and metric
- Confidence levels for visual estimates`;

export interface FormData {
  imageBase64: string;
  imageMimeType: string;
  intendedUse: string;
  sewingExperience: string;
  measurementSource: string;
  bodyMeasurements: string;
  materialChoice: string;
  letAiChooseMaterial: boolean;
}

export function buildUserPrompt(data: FormData): string {
  const materialInstruction = data.letAiChooseMaterial
    ? "Material Choice: The user is unsure about the best material. Please analyze the garment reference image and recommend the most suitable fabric(s) for this project, explaining your rationale based on the garment's structure, drape, and intended use."
    : `Material Choice: ${data.materialChoice || "Not specified — please recommend the best material based on the garment and intended use."}`;

  return `Generate a comprehensive, beautifully formatted sewing guide as a **complete, self-contained HTML document**.

The HTML must be a full document (<!DOCTYPE html> through </html>) with embedded CSS (using Tailwind CDN) and no external dependencies beyond the Tailwind CDN script.

**User Context:**
- Intended Use: ${data.intendedUse}
- Sewing Experience Level: ${data.sewingExperience}
- Measurement Source: ${data.measurementSource}
- Body Measurements: ${data.bodyMeasurements}
- ${materialInstruction}

**The garment reference image is attached.**

**Required HTML Document Structure:**

1. **Header** — Garment title (derived from your visual analysis), e.g. "Custom A-Line Midi Dress Pattern Guide"
2. **Project Overview** — Garment description, construction difficulty, material recommendation/selection with rationale
3. **Pattern Drafting** — Detailed steps to draft each pattern piece using the body measurements provided
4. **Cutting Guide** — Layout instructions for placing pattern pieces on fabric efficiently
5. **Assembly Instructions** — Logical step-by-step sewing directions from prep to final finishing
6. **Finishing Techniques** — Hemming, pressing, and any special finishing details

**HTML Design Requirements:**
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Primary accent color: #325ca8 (use for headings, borders, step numbers)
- Background: white/very light gray (#faf8fd)
- Typography: use Google Fonts Inter (sans-serif) for body, a serif for the main title
- Garment reference image: display prominently at the top using: <img src="data:${data.imageMimeType};base64,${data.imageBase64}" ...>
- Sections separated by subtle dividers with good whitespace
- Numbered steps in ordered lists <ol> with styled step numbers
- Measurements in bold, always showing both imperial and metric, e.g. <strong>10 inches (25.4 cm)</strong>
- Mobile-responsive layout
- Clean, modern aesthetic — professional sewing/fashion publication feel
- Do NOT include any footer with copyright text

Output ONLY the raw HTML document starting with <!DOCTYPE html>. No markdown code fences, no explanatory text before or after.`;
}
