import { useEffect, useState } from "react";
import { getDonatedItems } from "@/lib/storage";
import { DonatedItem } from "@/types/donation";
import { ItemCard, PlaceholderCard } from "@/components/ItemCard";
import { Package } from "lucide-react";

const PLACEHOLDER_ITEMS = [
  { name: "Vintage Desk Lamp", category: "Furniture", condition: "Good", location: "Downtown" },
  { name: "Children's Books Set", category: "Books", condition: "Like New", location: "East Side" },
  { name: "Kitchen Mixer", category: "Kitchen", condition: "Fair", location: "Suburb Area" },
  { name: "Yoga Mat", category: "Sports", condition: "Good", location: "North District" },
  { name: "Winter Jacket (M)", category: "Clothing", condition: "Like New", location: "Central" },
  { name: "Board Games Bundle", category: "Toys", condition: "Good", location: "West End" },
];

export function ItemGrid() {
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load items from localStorage on mount
    const items = getDonatedItems();
    setDonatedItems(items);
    setIsLoading(false);

    // Listen for storage changes (for real-time updates)
    const handleStorageChange = () => {
      const updatedItems = getDonatedItems();
      setDonatedItems(updatedItems);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("donationAdded", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("donationAdded", handleStorageChange);
    };
  }, []);

  return (
    <section id="items" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground mb-4">
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium">Available Items</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Donated Items
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover items waiting for a new home. Each donation represents someone's 
            generosity and your opportunity to give an item a second life.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div id="item-listing-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dynamically added donated items */}
            {donatedItems.map((item, index) => (
              <ItemCard key={item.id} item={item} isNew={index === 0} />
            ))}

            {/* Static placeholder items */}
            {PLACEHOLDER_ITEMS.map((item, index) => (
              <PlaceholderCard
                key={`placeholder-${index}`}
                name={item.name}
                category={item.category}
                condition={item.condition}
                location={item.location}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
