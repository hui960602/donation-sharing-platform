import { useEffect, useState } from "react";
import { getDonatedItems, deleteDonatedItem } from "@/lib/storage";
import { DonatedItem } from "@/types/donation";
import { ItemCard, PlaceholderCard } from "@/components/ItemCard";
import { ClaimConfirmDialog, ClaimSuccessDialog } from "@/components/ClaimDialog";
import { Package } from "lucide-react";

interface PlaceholderItem {
  id: string;
  name: string;
  category: string;
  condition: string;
  location: string;
}

const INITIAL_PLACEHOLDER_ITEMS: PlaceholderItem[] = [
  { id: "ph-1", name: "Vintage Desk Lamp", category: "Furniture", condition: "Good", location: "Downtown" },
  { id: "ph-2", name: "Children's Books Set", category: "Books", condition: "Like New", location: "East Side" },
  { id: "ph-3", name: "Kitchen Mixer", category: "Kitchen", condition: "Fair", location: "Suburb Area" },
  { id: "ph-4", name: "Yoga Mat", category: "Sports", condition: "Good", location: "North District" },
  { id: "ph-5", name: "Winter Jacket (M)", category: "Clothing", condition: "Like New", location: "Central" },
  { id: "ph-6", name: "Board Games Bundle", category: "Toys", condition: "Good", location: "West End" },
];

export function ItemGrid() {
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>([]);
  const [placeholderItems, setPlaceholderItems] = useState<PlaceholderItem[]>(INITIAL_PLACEHOLDER_ITEMS);
  const [isLoading, setIsLoading] = useState(true);

  // Claim dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [claimTarget, setClaimTarget] = useState<{ type: "donated" | "placeholder"; id: string; name: string } | null>(null);

  useEffect(() => {
    const items = getDonatedItems();
    setDonatedItems(items);
    setIsLoading(false);

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

  const handleClaimAttempt = (type: "donated" | "placeholder", id: string, name: string) => {
    setClaimTarget({ type, id, name });
    setConfirmOpen(true);
  };

  const handleConfirmClaim = () => {
    if (!claimTarget) return;

    if (claimTarget.type === "donated") {
      // Remove from localStorage
      deleteDonatedItem(claimTarget.id);
      // Remove from state
      setDonatedItems((prev) => prev.filter((item) => item.id !== claimTarget.id));
    } else {
      // Remove placeholder from state
      setPlaceholderItems((prev) => prev.filter((item) => item.id !== claimTarget.id));
    }

    // Close confirm, show success
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setClaimTarget(null);
  };

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
              <ItemCard
                key={item.id}
                item={item}
                isNew={index === 0}
                onClaim={(item) => handleClaimAttempt("donated", item.id, item.itemName)}
              />
            ))}

            {/* Static placeholder items */}
            {placeholderItems.map((item) => (
              <PlaceholderCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                condition={item.condition}
                location={item.location}
                onClaim={() => handleClaimAttempt("placeholder", item.id, item.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ClaimConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmClaim}
        itemName={claimTarget?.name || ""}
      />

      {/* Success Modal */}
      <ClaimSuccessDialog open={successOpen} onOpenChange={handleSuccessClose} />
    </section>
  );
}
