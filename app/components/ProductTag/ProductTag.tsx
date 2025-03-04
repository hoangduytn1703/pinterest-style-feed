import { useState, useRef } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import type { ProductTag as ProductTagType } from '../../models/types';
import * as styles from './ProductTag.css';

interface ProductTagProps {
  tag: ProductTagType;
  containerWidth: number;
  containerHeight: number;
}

export const ProductTag = ({ tag }: ProductTagProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Tính toán vị trí tag dựa trên x, y (phần trăm)
  const tagStyle = {
    left: `${tag.x}%`,
    top: `${tag.y}%`,
  };
  
  // Nội dung tooltip
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
    >
      <div 
        className={styles.tagIndicator} 
        style={tagStyle}
        onClick={() => setIsVisible(!isVisible)}
        aria-label={`Product tag: ${tag.name}`}
      />
    </Tippy>
  );
}