export interface DropdownSelectorProps {
  options: string[];
  onChange: (selectedOption: string) => void;
  defaultOption: string;
  className?: string;
}
