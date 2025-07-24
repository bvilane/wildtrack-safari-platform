output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.wildtrack_vpc.id
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.wildtrack_repo.repository_url
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.wildtrack_db.endpoint
  sensitive   = true
}

output "database_port" {
  description = "RDS instance port"
  value       = aws_db_instance.wildtrack_db.port
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public_subnets[*].id
}