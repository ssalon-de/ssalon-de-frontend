import { Scissors } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center">
      <Scissors className="w-8 h-8 text-blue-600" />
      <span className="text-xl font-bold text-gray-800 ml-2">HairSalon</span>
    </div>
  );
}
