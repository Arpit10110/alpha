import { useMemo, useState } from 'react';
import { ContactFiltersState, ContactStage } from '../model/contact.types';
import { useDebouncedValue } from './useDebouncedValue';

export function useContactFilters() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const [selectedStages, setSelectedStages] = useState<ContactStage[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const toggleStage = (stage: ContactStage) => {
    setSelectedStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const toggleOwner = (owner: string) => {
    setSelectedOwners((prev) =>
      prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]
    );
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const setSingleLabel = (label: string | null) => {
    if (!label) {
      setSelectedLabels([]);
    } else {
      setSelectedLabels((prev) => (prev.length === 1 && prev[0] === label ? [] : [label]));
    }
  };

  const clearSearch = () => {
    setSearchInput('');
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSelectedStages([]);
    setSelectedOwners([]);
    setSelectedLabels([]);
  };

  const filtersState: ContactFiltersState = useMemo(
    () => ({
      search: debouncedSearch,
      stages: selectedStages,
      owners: selectedOwners,
      labels: selectedLabels,
    }),
    [debouncedSearch, selectedStages, selectedOwners, selectedLabels]
  );

  const activeFilterCount =
    (debouncedSearch.trim() ? 1 : 0) +
    selectedStages.length +
    selectedOwners.length +
    selectedLabels.length;

  const hasActiveFilters = activeFilterCount > 0;

  return {
    searchInput,
    setSearchInput,
    debouncedSearch,
    selectedStages,
    selectedOwners,
    selectedLabels,
    setSelectedLabels,
    setSingleLabel,
    toggleStage,
    toggleOwner,
    toggleLabel,
    clearSearch,
    clearAllFilters,
    filtersState,
    activeFilterCount,
    hasActiveFilters,
  };
}
