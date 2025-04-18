import React from 'react';

const MainTable = ({ title, columns, rows, rowLimit }) => {
  const displayedRows = rowLimit ? rows.slice(0, rowLimit) : rows;

  return (
    <div className="w-full px-8 mb-8 rounded">
      <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
        {title && (
          <div className="px-6 py-4">
            <h3 className="text-white text-lg font-medium">{title}</h3>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 ${
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-700 text-white">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 ${
                        col.align === 'center'
                          ? 'text-center'
                          : col.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
