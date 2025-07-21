import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sections = ({ sections, warehouseId }) => {
  console.log(sections);
  return (
    <div>
      <h2 className="text-2xl font-bold text-accent-800 mb-4">Sections</h2>
      <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.id}>
            <Link to={`/warehouse/${warehouseId}/section/${section.id}`} className="hover:text-primary-500">
              <p>{section.name}</p>
              <div className="flex items-center justify-between">
                <Settings className="w-6 h-6 text-accent-800" />
              </div>
              <p>{section.description}</p>
              <p>Products: {section.products.length}</p>
              <p>Total Inventory: {section.totalInventory}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sections;