"use client";
import React, { useState, useEffect } from 'react';
import "./selectBrand.css"
import { SignInBrand } from '@/utils/types';

interface SelectBrandsProps {
  brands: SignInBrand[];
  onChange: (selectedBrandIds: string[]) => void;
}

const SelectBrands: React.FC<SelectBrandsProps> = ({ brands, onChange }) => {
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedBrandIds);
  }, [selectedBrandIds, onChange]);

  const handleSelectBrand = (brandId: string) => {
    if (selectedBrandIds.includes(brandId)) {
      setSelectedBrandIds(selectedBrandIds.filter((id) => id !== brandId));
    } else {
      setSelectedBrandIds([...selectedBrandIds, brandId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedBrandIds.length === brands.length) {
      setSelectedBrandIds([]);
    } else {
      setSelectedBrandIds(brands.map(brand => brand.id));
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-5">
        <p className="text-md text-neutral-2 font-semibold">Select Brands</p>
        <button
          onClick={handleSelectAll}
          className="flex items-center"
        >
          <span className="text-md text-neutral-4 font-normal mr-2">Select All</span>
          <input
            type="checkbox"
            checked={selectedBrandIds.length === brands.length}
            readOnly
            className="custom-checkbox"
          />
        </button>
      </div>
     <div className='max-h-[100px] overflow-y-auto'>
     {brands.map((brand) => (
        <div key={brand.id} className="flex justify-between items-center mb-2">
          <span className='text-md text-neutral-2 font-normal'>{brand.name}</span>
          <input
            type="checkbox"
            checked={selectedBrandIds.includes(brand.id)}
            onChange={() => handleSelectBrand(brand.id)}
            className="custom-checkbox"
          />
        </div>
      ))}
     </div>
    </div>
  );
};

export default SelectBrands;
