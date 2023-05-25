export interface IDropdownSelectorProps {
  options: string[];
  onChange: (selectedOption: string) => void;
  defaultOption: string;
  className?: string;
}
