import { useState, useMemo } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface DowntimeCode {
  id: number;
  code: string;
  description: string;
  machine: string;
  type: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allCodes = [] } = useQuery({
    queryKey: ['/api/downtime-codes'],
    queryFn: async () => {
      const res = await fetch('/api/downtime-codes');
      return res.json() as Promise<DowntimeCode[]>;
    },
  });

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return allCodes.filter(item => 
      item.description.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.machine.toLowerCase().includes(term)
    );
  }, [searchTerm, allCodes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Downtime Code Search
          </h1>
          <p className="text-slate-600 mb-6">
            Search by description, code, or machine type to find matching downtime codes
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Enter downtime description (e.g., 'cutter soap', 'white spec', 'D17')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-700"
              data-testid="input-search"
            />
          </div>
        </div>

        {searchTerm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Search Results
              </h2>
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full" data-testid="text-result-count">
                {filteredResults.length} {filteredResults.length === 1 ? 'match' : 'matches'}
              </span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto text-slate-400 mb-3" size={48} />
                <p className="text-slate-600 text-lg">No matching results found</p>
                <p className="text-slate-500 text-sm mt-2">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    data-testid={`card-code-${item.code}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-blue-600" data-testid={`text-code-${item.code}`}>
                            {item.code}
                          </span>
                          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded" data-testid={`badge-machine-${item.code}`}>
                            {item.machine}
                          </span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded" data-testid={`badge-type-${item.code}`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed" data-testid={`text-description-${item.code}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              How to use
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Type any part of the downtime description to search</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Search by code (e.g., "D10", "D747")</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Filter by machine type (e.g., "Cutter", "Plodder", "Stamper")</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Results show the code, machine affected, and issue type</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
