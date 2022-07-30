import { KeyboardEvent, useEffect, useId, useState } from 'react';

import { Container, Option } from './styles';

export type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  items?: string[];
  onSelectItem?: (item: string) => void;
};

export const SearchInput = ({
  value,
  onChange,
  items,
  onSelectItem,
}: SearchInputProps) => {
  const datalistId = useId();

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    setOpen(items.length > 0);
    setHover(-1);
  }, [items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === 'ArrowUp') {
      e.preventDefault();

      setHover(prev => Math.max(prev - 1, -1));
    } else if (key === 'ArrowDown') {
      e.preventDefault();

      setHover(prev => Math.min(prev + 1, items.length - 1));
    } else if (key === 'Enter' && onSelectItem) {
      onSelectItem(hover !== -1 ? items[hover] : value);
    }
  };

  return (
    <Container open={open}>
      <input
        list={datalistId}
        type="text"
        value={value}
        onChange={onChange && (e => onChange(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(items.length > 0)}
        onBlur={() => [setOpen(false), setHover(-1)]}
      />
      <div
        className="options"
        id={datalistId}
        onMouseLeave={() => setHover(-1)}
      >
        {items.map((item, index) => (
          <Option
            key={item}
            role="option"
            aria-selected={hover === index}
            hover={hover === index}
            onMouseEnter={() => setHover(index)}
          >
            {item}
          </Option>
        ))}
      </div>
    </Container>
  );
};
