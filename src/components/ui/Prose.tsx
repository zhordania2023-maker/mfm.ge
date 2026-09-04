/**
 * მინიმალური markdown-ის მსგავსი რენდერერი სტატიებისთვის.
 * მხარდაჭერილია: "## სათაური", "> ციტატა", "- სია", ჩვეულებრივი აბზაცი.
 */
export function Prose({ blocks }: { blocks: string[] }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={key}>
          {list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  blocks.forEach((block, i) => {
    const key = `b-${i}`;
    if (block.startsWith("## ")) {
      flush(`l-${i}`);
      out.push(<h2 key={key}>{block.slice(3)}</h2>);
    } else if (block.startsWith("### ")) {
      flush(`l-${i}`);
      out.push(<h3 key={key}>{block.slice(4)}</h3>);
    } else if (block.startsWith("> ")) {
      flush(`l-${i}`);
      out.push(<blockquote key={key}>{block.slice(2)}</blockquote>);
    } else if (block.startsWith("- ")) {
      list.push(block.slice(2));
    } else {
      flush(`l-${i}`);
      out.push(<p key={key}>{block}</p>);
    }
  });
  flush("l-end");

  return <div className="prose-geo">{out}</div>;
}
