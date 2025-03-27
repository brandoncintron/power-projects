/**
 * Public routes that don't require authentication
 * @type {string[]}
 */

export const protectedRoutes = [
    "/dashboard",
    "/submit-project"
]

/**
 * API routes that are used for api authentication
 * These routes are prefixed with /api/auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";