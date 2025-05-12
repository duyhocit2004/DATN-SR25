import { useState, useEffect } from 'react';
import axios from 'axios';

interface AddressItem {
  code: string;
  name: string;
}

interface AddressCache {
  provinces: AddressItem[];
  districts: Record<string, AddressItem[]>;
  wards: Record<string, AddressItem[]>;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
let addressCache: AddressCache | null = null;

export const useAddress = () => {
  const [provinces, setProvinces] = useState<AddressItem[]>([]);
  const [districts, setDistricts] = useState<AddressItem[]>([]);
  const [wards, setWards] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProvinces = async () => {
    if (addressCache?.provinces && Date.now() - addressCache.timestamp < CACHE_DURATION) {
      setProvinces(addressCache.provinces);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      const provincesData = response.data;
      setProvinces(provincesData);
      
      // Update cache
      addressCache = {
        ...addressCache,
        provinces: provincesData,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode: string) => {
    if (addressCache?.districts[provinceCode] && Date.now() - addressCache.timestamp < CACHE_DURATION) {
      setDistricts(addressCache.districts[provinceCode]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const districtsData = response.data.districts;
      setDistricts(districtsData);
      
      // Update cache
      addressCache = {
        ...addressCache,
        districts: {
          ...addressCache?.districts,
          [provinceCode]: districtsData
        },
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (districtCode: string) => {
    if (addressCache?.wards[districtCode] && Date.now() - addressCache.timestamp < CACHE_DURATION) {
      setWards(addressCache.wards[districtCode]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const wardsData = response.data.wards;
      setWards(wardsData);
      
      // Update cache
      addressCache = {
        ...addressCache,
        wards: {
          ...addressCache?.wards,
          [districtCode]: wardsData
        },
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    provinces,
    districts,
    wards,
    loading,
    fetchProvinces,
    fetchDistricts,
    fetchWards
  };
}; 