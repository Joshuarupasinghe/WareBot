import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextField from '../components/TextField';

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

  // Enhanced search with debounce logic
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const debounceTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/stocks/search?name=${encodeURIComponent(searchTerm)}`,
          { cancelToken: source.token }
        );
        setSuggestions(Array.isArray(data) ? data : []);
        setError('');
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Search error:', err);
          setError('Failed to load suggestions.');
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      source.cancel();
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stock) => {
    setSelectedStock(stock);
    setSearchTerm(stock.Name);
    setSuggestions([]);
    setError('');
  };

  const handleSummon = async () => {
    if (!selectedStock) return;
    try {
      await axios.post('/api/robot/summon', { stockId: selectedStock.StockId });
      alert(`Robot summoned for Stock #${selectedStock.StockId}`);
    } catch (err) {
      console.error('Summon error:', err);
      alert('Failed to summon robot.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-black/90 to-indigo-950/30 backdrop-blur-sm rounded-xl shadow-xl mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-white">Deliver by Robot</h1>

      {error && <div className="text-red-400 mb-2 text-center">{error}</div>}

      <div className="relative mb-4" ref={dropdownRef}>
        <TextField
          label="Product Name"
          placeholder="Start typing to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && (
          <div className="absolute top-full left-0 bg-[#151D30] p-2 text-white rounded-b-md">Loading...</div>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-[#151D30] border border-gray-500 rounded-md max-h-48 overflow-auto z-10">
            {suggestions.map((s) => (
              <li
                key={s._id}
                className="p-2 hover:bg-indigo-700 cursor-pointer text-white flex justify-between items-center"
                onClick={() => handleSelect(s)}
              >
                <span>{s.Name}</span>
                <span className="text-sm text-gray-400">ID: {s.StockId}</span>
              </li>
            ))}
          </ul>
        )}

        {!loading && searchTerm && suggestions.length === 0 && (
          <div className="absolute top-full left-0 bg-[#151D30] p-2 rounded-b-md text-white">
            No products found.
          </div>
        )}
      </div>

      <TextField
        label="Stock ID"
        value={selectedStock?.StockId || ''}
        readOnly
      />

      <button
        onClick={handleSummon}
        disabled={!selectedStock}
        className={`w-full mt-4 py-3 rounded-xl font-medium transform transition 
          ${selectedStock ? 'bg-gradient-to-r from-[#5653FE] to-[#8B5CF6] hover:opacity-90 hover:scale-105' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Summon Robot for Delivery
      </button>
    </div>
  );
};

export default StockSearch;
