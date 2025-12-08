variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "buy-it-v1"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-central-1"
}


# -----------------------
# Environment Variables
# -----------------------

variable "database_url" {
  description = "PostgreSQL database connection URL"
  type        = string
  sensitive   = true
}

variable "direct_database_url" {
  description = "Direct PostgreSQL database connection URL"
  type        = string
  sensitive   = true
}

variable "nextauth_url" {
  description = "NextAuth.js URL (CloudFront URL)"
  type        = string
}

variable "nextauth_secret" {
  description = "NextAuth.js secret for session encryption"
  type        = string
  sensitive   = true
}

variable "keycloak_client_id" {
  description = "Keycloak client ID"
  type        = string
}

variable "keycloak_client_secret" {
  description = "Keycloak client secret"
  type        = string
  sensitive   = true
}

variable "keycloak_issuer" {
  description = "Keycloak issuer URL"
  type        = string
}

variable "tolgee_api_key" {
  description = "Tolgee API key"
  type        = string
  sensitive   = true
}

variable "tolgee_api_url" {
  description = "Tolgee API URL"
  type        = string
}

variable "image_tag" {
  description = "Docker image tag to deploy (typically git SHA from CI/CD)"
  type        = string
  default     = "latest"
}
