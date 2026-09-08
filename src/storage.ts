import type { Trip } from "./types";

const KEY = "travel-footprints:trips";
const TAGS_KEY = "travel-footprints:tags";

export type FootprintsData = {
  version: number;
  tags: string[];
  trips: Trip[];
};

function parseFootprintsData(value: unknown): FootprintsData {
  if (Array.isArray(value)) {
    const trips = value as Trip[];
    return { version: 1, tags: Array.from(new Set(trips.map((trip) => trip.tag))), trips };
  }

  if (value && typeof value === "object") {
    const data = value as Partial<FootprintsData>;
    if (Array.isArray(data.trips)) {
      const inferredTags = Array.from(new Set(data.trips.map((trip) => trip.tag)));
      return {
        version: typeof data.version === "number" ? data.version : 2,
        tags: Array.isArray(data.tags) ? data.tags : inferredTags,
        trips: data.trips,
      };
    }
  }

  throw new Error("Invalid footprint data format");
}


export function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as Trip[]) : [];
  } catch {
    return [];
  }
}

export function saveTrips(trips: Trip[]) {
  localStorage.setItem(KEY, JSON.stringify(trips));
}

export function clearTrips() {
  localStorage.removeItem(KEY);
}

export function loadTags(): string[] {
  try {
    const raw = localStorage.getItem(TAGS_KEY);
    if (!raw) return ["Me", "Couple"]; // 默认标签
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : ["Me", "Couple"];
  } catch {
    return ["Me", "Couple"];
  }
}

export function saveTags(tags: string[]) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}

export async function loadPublishedData(): Promise<FootprintsData> {
  const response = await fetch("/footprints.json", { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load published footprints (${response.status})`);
  return parseFootprintsData(await response.json());
}

// 🟢 导出功能：把数据变成文件下载
export function exportData(trips: Trip[]) {
  const dataStr = JSON.stringify(trips, null, 2); // 格式化，好看一点
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `travel-backup-${new Date().toISOString().slice(0, 10)}.json`; // 文件名带日期
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 🟢 导入功能：解析文件内容
export function importData(file: File): Promise<Trip[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        resolve(parseFootprintsData(JSON.parse(result)).trips);
      } catch {
        reject("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  });
}
