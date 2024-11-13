import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Search } from 'lucide-react';
import { kdramaDatabase } from '../data/kdramas';
import { KDrama } from '../types';

interface Props {
  onDramaSelect: (drama: KDrama) => void;
  disabled: boolean;
  selectedDramas: KDrama[];
}

const DramaInput = forwardRef<HTMLInputElement, Props>(({ onDramaSelect, disabled, selectedDramas }, ref) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTitles = new Set(selectedDramas.map(d => d.title));

  const filteredDramas = kdramaDatabase.filter(drama => {
    const matchesSearch = drama.title.toLowerCase().includes(search.toLowerCase());
    const notSelected = !selectedTitles.has(drama.title);
    return matchesSearch && notSelected;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (drama: typeof kdramaDatabase[0]) => {
    onDramaSelect({
      id: Math.random().toString(36).substr(2, 9),
      ...drama,
      rating: undefined
    });
    setSearch('');
    setShowDropdown(true);
    (ref as React.RefObject<HTMLInputElement>).current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredDramas.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredDramas.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredDramas.length) % filteredDramas.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect(filteredDramas[selectedIndex]);
        break;
      case 'Tab':
        e.preventDefault();
        handleSelect(filteredDramas[selectedIndex]);
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          ref={ref}
          type="text"
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 bg-white/90 backdrop-blur-sm
            ${disabled ? 'border-gray-200 bg-gray-50' : 'border-purple-200 focus:border-purple-500'}
            focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300`}
          placeholder={disabled ? "Maximum dramas reached!" : "Type to search K-Drama titles..."}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <Search className={`absolute right-3 top-3 sm:top-3.5 ${disabled ? 'text-gray-400' : 'text-purple-500'} w-4 h-4 sm:w-5 sm:h-5`} />
      </div>

      {showDropdown && search && (
        <div ref={dropdownRef} className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-purple-100 max-h-[300px] overflow-auto">
          {filteredDramas.map((drama, index) => (
            <button
              key={drama.title}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-purple-50 flex items-center gap-2 sm:gap-3 group transition-colors duration-200
                ${index === selectedIndex ? 'bg-purple-50' : ''}`}
              onClick={() => handleSelect(drama)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <img
                src={drama.image}
                alt={drama.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover group-hover:ring-2 ring-purple-400 transition-all duration-200"
              />
              <div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">{drama.title}</p>
                <p className="text-xs sm:text-sm text-gray-500">{drama.year}</p>
              </div>
            </button>
          ))}
          {filteredDramas.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-center text-sm">
              {search ? "No matching dramas found" : "Start typing to search"}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

DramaInput.displayName = 'DramaInput';

export default DramaInput;