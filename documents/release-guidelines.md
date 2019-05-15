# Release Guidelines

## Overview
On every new deployment to our environment we create an assoicated release note to reflect the changes made and the reference the source code at the point in time.

## Creating a Release
1. Go to https://github.com/UKHomeOffice/modern-slavery/releases
2. Click <b>Draft a New Release</b>
3. Fill out the Release Details
- <b>Tag version</b> - We follow the verisoning format of Major.Minor.Patch i.e. (v1.2.3) where Major = breaking change, Minor non-breaking change but more than a patch, like a new feature and a Patch = non breaking usually a bugfix
- <b>Target</b> - This will usually be the <b>master</b> branch as this will be the most stable version of the codebase
- <b>Release Title</b> - Will be in the format of <b>Project Name - Version {Release Version}</b> i.e. (Modern Slavery - Version modern-slavery v.1.2.3)
- <b>Description </b> - Here we will put the contents of our release (usually in accordance with the related JIRA release which is available in HTML format). Underneath any additional notes we link a reference to the related code repository.
- <b>Pre-release</b> - If the deployment is prior to a production release then we select this option to highlight this.
