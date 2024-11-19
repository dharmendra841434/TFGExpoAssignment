import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAllScheduledMatches } from "@/redux/AppSlice";

const STORAGE_KEY = "@app_data";

const useLocalDatabase = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Load data initially
  useEffect(() => {
    const loadItems = async () => {
      try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY);
        const data = existingData ? JSON.parse(existingData) : [];
        setItems(data);
        dispatch(setAllScheduledMatches(data));
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const getItems = async () => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : [];
      dispatch(setAllScheduledMatches(data));
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add an item
  const addItem = async (item: any) => {
    try {
      const updatedItems = [...items, item];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      dispatch(setAllScheduledMatches(updatedItems));
      console.log("Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an item by id
  const updateItem = async (id: string, updatedItem: any) => {
    try {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
      dispatch(setAllScheduledMatches(updatedItems));
      console.log("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item by id
  const deleteItem = async (id: string) => {
    try {
      const updatedItems = items.filter((item) => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
      dispatch(setAllScheduledMatches(updatedItems));
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return {
    items,
    loading,
    addItem,
    getItems,
    updateItem,
    deleteItem,
  };
};

export default useLocalDatabase;
