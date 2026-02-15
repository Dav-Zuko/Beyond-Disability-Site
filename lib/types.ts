/**
 * TypeScript interfaces for all WordPress content types.
 *
 * These match the shape of data returned by WPGraphQL.
 * ACF fields come back nested under a field group name
 * (e.g., story.storyFields.storyCategory).
 */

// ---------------------
// WordPress media image
// ---------------------
export interface WPImage {
  sourceUrl: string;
  altText: string;
}

// ---------------------
// Story (Custom Post Type)
// ---------------------
export interface StoryFields {
  storyCategory: string;
  storyAuthorName: string;
  storyExcerpt: string;
  storyFeatured: boolean;
}

export interface Story {
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage: {
    node: WPImage;
  } | null;
  storyFields: StoryFields;
}

// ---------------------
// Event (Custom Post Type)
// ---------------------
export interface EventFields {
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventDescription: string;
}

export interface Event {
  title: string;
  slug: string;
  eventFields: EventFields;
}

// ---------------------
// Resource (Custom Post Type)
// ---------------------
export interface ResourceFields {
  resourceDescription: string;
  resourceUrl: string;
  resourceCategory: string;
  resourceIcon: string;
}

export interface Resource {
  title: string;
  slug: string;
  resourceFields: ResourceFields;
}

// ---------------------
// Team Member (Custom Post Type)
// ---------------------
export interface TeamMemberFields {
  memberRole: string;
  memberBio: string;
}

export interface TeamMember {
  title: string;
  slug: string;
  featuredImage: {
    node: WPImage;
  } | null;
  teamMemberFields: TeamMemberFields;
}
