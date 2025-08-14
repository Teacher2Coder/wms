import { Link } from "react-router-dom";
import CreateSectionModal from "./CreateSectionModal";
import { useState } from "react";
import handleSmoothScroll from "../../utils/handleSmoothScroll";

const Sections = ({ sections, warehouseId }) => {
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  return (
    <div>
      {sections.length === 0 && (
        <div>
          <p>No sections found</p>
          <button onClick={() => setIsCreateSectionModalOpen(true)}>Create Section</button>
        </div>
      )}
      {sections.length > 0 && (
        <div>
        <h2 className="text-2xl font-bold text-accent-800 mb-4">Sections</h2>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id}>
              <Link 
                to={`/warehouse/${warehouseId}/section/${section.id}`} 
                className="hover:text-primary-500"
                onClick={() => handleSmoothScroll()}
              >
                <p>{section.name}</p>
                <p>{section.description}</p>
                <p>Products: {section.products.length}</p>
                <p>Total Inventory: {section.totalInventory}</p>
              </Link>
            </div>
          ))}
        </div>
        </div>
      )}
      <CreateSectionModal isOpen={isCreateSectionModalOpen} onClose={() => setIsCreateSectionModalOpen(false)} warehouseId={warehouseId} />
    </div>
  )
}

export default Sections;