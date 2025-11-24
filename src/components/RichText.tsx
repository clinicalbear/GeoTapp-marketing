import { useMemo } from "react";

type Props = {
  html: string;
  className?: string;
};

/**
 * Renders trusted rich text allowing basic HTML coming from the backend/CMS.
 * Strips script/style tags to reduce injection risk.
 */
export function RichText({ html, className }: Props) {
  const safeHtml = useMemo(() => {
    if (!html) return "";
    const withoutScripts = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    const withoutStyles = withoutScripts.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
    return withoutStyles;
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default RichText;
