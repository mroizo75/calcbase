const WRITE_ROLES = new Set(["administrator", "editor", "developer", "contributor"]);

interface SanityUserMe {
  role?: string;
  roles?: Array<{ name?: string }>;
}

interface SanityProject {
  members?: Array<{ role?: string; isCurrentUser?: boolean }>;
}

export function canRunWeeklySeo(roles: readonly string[]): boolean {
  return roles.some((role) => WRITE_ROLES.has(role));
}

function rolesFromMe(me: SanityUserMe): string[] {
  const named = (me.roles ?? [])
    .map((role) => role.name)
    .filter((name): name is string => Boolean(name));
  if (named.length > 0) return named;
  return me.role ? [me.role] : [];
}

async function readJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) return null;
  return (await response.json()) as T;
}

/** Confirms the bearer token is a Studio user who can edit this project. */
export async function resolveStudioRoles(token: string, projectId: string): Promise<string[]> {
  const meResponse = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const me = await readJson<SanityUserMe>(meResponse);
  if (!me) return [];

  const fromMe = rolesFromMe(me);
  if (fromMe.length > 0) return fromMe;

  const projectResponse = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const project = await readJson<SanityProject>(projectResponse);
  const current = project?.members?.find((member) => member.isCurrentUser);
  return current?.role ? [current.role] : [];
}
