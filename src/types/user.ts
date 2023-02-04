export interface UserLocal {
    login: string
    name: string
    avatar_url: string
}

export interface User extends UserLocal{
    bio: string
    location: string
    public_repos: string
    followers: string
    following: string
    html_url: string
}


