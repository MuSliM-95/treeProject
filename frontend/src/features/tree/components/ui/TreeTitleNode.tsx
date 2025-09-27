import React from "react"

export const TreeTitleNode: React.FC<any> = ({ data }) => {
  return (
    <div className="px-6 py-3 rounded-2xl bg-blue-600 text-white shadow-lg border border-blue-700">
      <h2 className="text-xl font-bold text-center">{data.label}</h2>
      {data.subtitle && (
        <p className="text-sm opacity-80 text-center">{data.subtitle}</p>
      )}
    </div>
  )
}
