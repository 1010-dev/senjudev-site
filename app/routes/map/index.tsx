import { createRoute } from "honox/factory";
import { Navigation } from "@/components/Navigation";
import Map from "@/islands/map";

export default createRoute((c) => {
  return c.render(
    <div class="min-h-screen bg-gray-100">
      <Navigation />
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">足立区マップ</h1>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <Map />
        </div>
      </main>
    </div>
  );
});