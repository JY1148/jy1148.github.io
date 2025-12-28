export interface PersonalInfo {
    name: string;
    bio: string[];
    socialLinks: SocialLink[];
    actions: Action[];
    image: string;
}

export interface SocialLink {
    label: string;
    icon: string;
    url: string;
}

export interface Action {
    label: string;
    url: string;
    class: string;
}

export interface Skills {
    title: string;
    items: SkillItem[];
    image: string;
}

export interface SkillItem {
    label: string;
    value: string;
}

export interface WorkExperience {
    position: string;
    company: string;
    location: string;
    duration: string;
    details: string[];
}

export interface AcademicExperience {
    position: string;
    course?: string;
    institution?: string;
    duration: string;
    details: string[];
}

export interface GalleryIntro {
    title: string;
    items: GalleryIntroItem[];
}

export interface GalleryIntroItem {
    label: string;
    value: string;
}

export interface GalleryProject {
    title: string;
    description: string;
    image: string;
    link: string;
}

export interface ProjectListItem {
    title: string;
    subtitle: string;
    tech: string;
    icon: string;
    link: string;
}

export interface FooterData {
    socialLinks: SocialLink[];
    copyright: string;
}

export interface ComponentsHeaders {
    workExperience: string;
    academicExperience: string;
    projectList: string;
    contact: string;
}

export interface PortfolioData {
    personalInfo: PersonalInfo;
    skills: Skills;
    headers: ComponentsHeaders;
    workExperiences: WorkExperience[];
    academicExperiences: AcademicExperience[];
    galleryIntro: GalleryIntro;
    galleryProjects: GalleryProject[];
    projectList: ProjectListItem[];
    footer: FooterData;
}
/**
 * For runtime-editable data, the app now loads JSON from `/portfolioData.json`.
 * Keep the TypeScript interfaces here so components can import types.
 */

export async function fetchPortfolioData(): Promise<PortfolioData> {
    async function fetchJson<T>(filename: string): Promise<T | null> {
        try {
            const res = await fetch(`/data/${filename}`, { cache: 'no-store' });
            if (!res.ok) return null;
            return (await res.json()) as T;
        } catch (e) {
            return null;
        }
    }

    const [personalInfo, skills, headers, workExperiences, academicExperiences, galleryIntro, galleryProjects, projectList] = await Promise.all([
        fetchJson<PersonalInfo>('personalInfo.json'),
        fetchJson<Skills>('skills.json'),
        fetchJson<ComponentsHeaders>('headers.json'),
        fetchJson<WorkExperience[]>('workExperiences.json'),
        fetchJson<AcademicExperience[]>('academicExperiences.json'),
        fetchJson<GalleryIntro>('galleryIntro.json'),
        fetchJson<GalleryProject[]>('galleryProjects.json'),
        fetchJson<ProjectListItem[]>('projectList.json'),
    ]);

    // Provide sensible defaults for any missing parts so the app can still render.
    const merged: PortfolioData = {
        personalInfo: personalInfo ?? {
            name: 'Unknown',
            bio: [],
            socialLinks: [],
            actions: [],
            image: '',
        },
        skills: skills ?? { title: 'Skills', items: [], image: '' },
        headers: headers ?? { workExperience: 'Work Experience', academicExperience: 'Academic Experience', projectList: 'Projects', contact: 'Contact' },
        workExperiences: workExperiences ?? [],
        academicExperiences: academicExperiences ?? [],
        galleryIntro: galleryIntro ?? { title: 'Gallery', items: [] },
        galleryProjects: galleryProjects ?? [],
        projectList: projectList ?? [],
        footer: { socialLinks: [], copyright: '' },
    };

    return merged;
}
