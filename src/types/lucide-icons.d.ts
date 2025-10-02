import type { IconNode } from "lucide";

declare module "lucide/icons/*" {
  const icon: IconNode;
  export default icon;
}

declare module "lucide/dist/esm/icons/*.js" {
  const icon: IconNode;
  export default icon;
}
