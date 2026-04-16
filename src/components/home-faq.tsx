import { homeFaq } from "@/lib/data";

import { FaqAccordion } from "@/components/faq-accordion";

export function HomeFaq() {
  return <FaqAccordion items={homeFaq} />;
}
