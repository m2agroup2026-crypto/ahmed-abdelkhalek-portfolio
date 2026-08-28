import {
  createHomepageSocialImage,
  homepageSocialImageContentType,
  homepageSocialImageSize,
} from "@/app/components/Social/HomepageSocialImage";

export const alt =
  "Ahmed Abdelkhalek — Enterprise Systems & Platform Architect";
export const size = homepageSocialImageSize;
export const contentType =
  homepageSocialImageContentType;

export default function Image() {
  return createHomepageSocialImage();
}
