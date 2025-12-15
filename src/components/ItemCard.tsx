import { DonatedItem } from "@/types/donation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Tag, Clock, Hand } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ItemCardProps {
  item: DonatedItem;
  isNew?: boolean;
  onClaim: (item: DonatedItem) => void;
}

export function ItemCard({ item, isNew = false, onClaim }: ItemCardProps) {
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });

  return (
    <article className={`group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${isNew ? 'animate-scale-in ring-2 ring-primary' : ''}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.imageBase64}
          alt={item.itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {isNew && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground font-semibold">
              New
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {item.condition}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-card-foreground line-clamp-1">
            {item.itemName}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4 text-primary" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{timeAgo}</span>
          </div>
        </div>

        <Button className="w-full" size="sm" onClick={() => onClaim(item)}>
          <Hand className="h-4 w-4 mr-2" />
          Claim Now
        </Button>
      </div>
    </article>
  );
}

// Static placeholder card component
interface PlaceholderCardProps {
  id: string;
  name: string;
  category: string;
  condition: string;
  location: string;
  onClaim: () => void;
}

export function PlaceholderCard({ name, category, condition, location, onClaim }: PlaceholderCardProps) {
  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src="https://via.placeholder.com/400x200"
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {condition}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-card-foreground line-clamp-1 mb-2">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          Great item looking for a new home. Contact for more details.
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4 text-primary" />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <Button className="w-full" size="sm" onClick={onClaim}>
          <Hand className="h-4 w-4 mr-2" />
          Claim Now
        </Button>
      </div>
    </article>
  );
}
