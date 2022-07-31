import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { Container, Option } from './styles';

export type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  items?: {
    key: string;
    value: string;
    label?: string;
  }[];
  onSelectItem?: (item: { key: string; value: string; label?: string }) => void;
};

export const SearchInput = ({
  value,
  placeholder,
  onChange,
  items,
  onSelectItem,
}: SearchInputProps) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const [display, setDisplay] = useState<string>();

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current.focus();

    document.body.addEventListener('click', () => {
      setOpen(false);
    });
  }, []);

  useEffect(() => {
    setOpen(items.length > 0);
    setHover(-1);
    setDisplay(undefined);
  }, [items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === 'ArrowUp') {
      e.preventDefault();

      setHover(prev => Math.max(prev - 1, -1));
    } else if (key === 'ArrowDown') {
      e.preventDefault();

      setHover(prev => Math.min(prev + 1, items.length - 1));
    } else if (key === 'Enter' && onSelectItem && hover !== -1) {
      setDisplay(items[hover].value);
      setOpen(false);

      onSelectItem(items[hover]);
    }
  };

  const handleOptionClick = (
    e: MouseEvent,
    item: { key: string; value: string }
  ) => {
    e.preventDefault();

    setDisplay(value);
    setOpen(false);

    onSelectItem(item);
  };

  return (
    <Container open={open}>
      <input
        ref={inputRef}
        type="text"
        value={display || value}
        placeholder={placeholder}
        onChange={onChange && (e => onChange(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(items.length > 0)}
        onClick={e => e.stopPropagation()}
      />
      <div className="options" onMouseLeave={() => setHover(-1)}>
        {items.map((item, index) => (
          <Option
            key={item.key}
            role="option"
            aria-selected={hover === index}
            hover={hover === index}
            onMouseEnter={() => setHover(index)}
            onClick={e => handleOptionClick(e, item)}
          >
            {item.label || item.value}
          </Option>
        ))}
      </div>
    </Container>
  );
};
