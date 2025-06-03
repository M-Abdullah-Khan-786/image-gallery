type ImageProps = {
  image: {
    urls: { small: string };
    alt_description: string;
    user: { name: string };
  };
  onClick: () => void;
};

export default function ImageCard({ image, onClick }: ImageProps) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className="w-full h-60 object-cover rounded-lg shadow"
      />
      <p className="mt-2 text-sm text-gray-600">By {image.user.name}</p>
    </div>
  );
}
