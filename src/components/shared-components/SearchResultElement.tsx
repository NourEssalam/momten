import Image from "next/image";
export default function SearchResultElement() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="max-w-[150px] rounded overflow-hidden">
        <Image
          src="/img/gallery/activities.jpg"
          alt="image"
          width={100}
          height={100}
          className="w-full  object-cover"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-shade">Activity title</h3>
        <p className="text-xs text-secondary">Description about the activity</p>
      </div>
    </div>
  );
}
