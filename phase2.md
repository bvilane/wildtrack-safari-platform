# Phase 2: IaC, Containerization & Manual Deployment

## Live Application URL
🌐 **Live URL**: https://pkdkdsk452.us-east-1.awsapprunner.com/

## Provisioned Resources Screenshots
### AWS Resources Overview
![AWS Console Overview](screenshots/aws-overview.png)

### ECR Repository
![ECR Repository](screenshots/ecr-repository.png)

### RDS Database
![RDS Database](screenshots/rds-database.png)

### VPC and Networking
![VPC Setup](screenshots/vpc-networking.png)

## Peer Review
📝 **Pull Request Reviewed**: [Link to peer's PR you reviewed]

## Reflection

### Challenges with Infrastructure as Code (IaC)
- **Challenge 1**: Setting up proper VPC networking and security groups
- **Solution**: Used AWS documentation and modular Terraform approach

- **Challenge 2**: Managing Terraform state and variables
- **Solution**: Implemented proper variable definitions and outputs

### Manual Deployment Process Challenges
- **Challenge 1**: Building and pushing Docker images to ECR
- **Solution**: Set up proper AWS CLI authentication and ECR login

- **Challenge 2**: Configuring container service to connect to RDS
- **Solution**: Used environment variables and security group rules

### Key Learnings
1. **IaC Benefits**: Reproducible infrastructure, version control for infrastructure
2. **Docker Optimization**: Multi-stage builds significantly reduce image size
3. **Cloud Integration**: Importance of proper networking and security configurations
4. **Manual vs Automated**: Manual deployment helps understand the process before automation

### Future Improvements
- Implement automated deployment pipeline (Phase 3)
- Add monitoring and logging infrastructure
- Optimize container images further
- Implement secrets management

---
*Deployment completed on: [Date]*
*Total setup time: [X hours]*