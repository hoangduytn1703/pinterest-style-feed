import { useState, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import type { ProductTag as ProductTagType } from "../../models/types";
import * as styles from "./ProductTag.css";

interface ProductTagProps {
  tag: ProductTagType;
  containerWidth: number;
  containerHeight: number;
}

export const ProductTag = ({ tag }: ProductTagProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Calculate tag position based on x, y (percentage)
  const tagStyle = {
    left: `${tag.x}%`,
    top: `${tag.y}%`,
  };

  // Tooltip content
  const content = (
    <div>
      <div className={styles.tagName}>{tag.name}</div>
      <div className={styles.tagPrice}>
        {tag.currency} {tag.price.toFixed(2)}
      </div>
    </div>
  );

  return (
    <Tippy
      content={content}
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
      interactive={true}
      placement="auto"
      theme="light"
      maxWidth={200}
      appendTo="parent"
      arrow={true}
      animation="fade"
      onMount={() => {
        // Add class to handle animation when shown
        document.body.classList.add("tippy-active");
      }}
      onHide={() => {
        document.body.classList.remove("tippy-active");
      }}
    >
      <div
        className={styles.tagIndicator}
        style={tagStyle}
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label={`Product tag: ${tag.name}`}
      />
    </Tippy>
  );
};
