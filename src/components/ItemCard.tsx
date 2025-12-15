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
    <article className={`group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isNew ? 'ring-2 ring-primary ring-offset-2 ring-offset-background animate-scale-in' : ''}`}>
      {/* Full-width Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          src={item.imageBase64}
          alt={item.itemName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground font-bold shadow-lg">
              ✨ New
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-background/95 backdrop-blur-md text-foreground font-medium shadow-lg">
            {item.condition}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {item.itemName}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-4 mb-5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Tag className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-1.5 rounded-full bg-primary/10">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Clock className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{timeAgo}</span>
          </div>
        </div>

        <Button 
          className="w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all" 
          onClick={() => onClaim(item)}
        >
          <Hand className="h-5 w-5 mr-2" />
          Claim Now
        </Button>
      </div>
    </article>
  );
}

// Static placeholder card component with matching modern design
interface PlaceholderCardProps {
  id: string;
  name: string;
  category: string;
  condition: string;
  location: string;
  imageUrl: string;
  onClaim: () => void;
}

export function PlaceholderCard({ name, category, condition, location, imageUrl, onClaim }: PlaceholderCardProps) {
  return (
    <article className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Full-width Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Condition Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-background/95 backdrop-blur-md text-foreground font-medium shadow-lg">
            {condition}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
          Great item looking for a new home. Contact for more details about pickup and availability.
        </p>

        <div className="flex flex-wrap gap-4 mb-5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Tag className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-1.5 rounded-full bg-primary/10">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{location}</span>
          </div>
        </div>

        <Button 
          className="w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all" 
          onClick={onClaim}
        >
          <Hand className="h-5 w-5 mr-2" />
          Claim Now
        </Button>
      </div>
    </article>
  );
}
