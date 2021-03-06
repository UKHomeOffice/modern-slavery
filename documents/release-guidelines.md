# Release Guidelines

# Contents
1. [Overview](#overview)
2. [Version Control](#version-control)
3. [Collating Issues for Release using Project Management Tool (JIRA)](#collating-issues-for-release)
4. [Creating a Release](#creating-a-release)
5. [Deployment & Completing a Release](#deployment-and-completing-a-release)
    - [Deployment for Development Testing](#dev-deployment)
    - [Deployment for a Release](#release-deployment)
    - [Deployment](#deployment)

## Overview <a name="overview"></a>
On every new deployment to our environment we create an assoicated release note to reflect the changes made and the reference the source code at the point in time.
We currently use <a href="https://www.atlassian.com/software/jira">JIRA</a> to manage project tasks and issues.

## Version Control <a name="version-control"></a>
We follow the version format of Major.Minor.Patch i.e. (v1.2.3) where Major = breaking change, Minor non-breaking change but more than a patch, like a new feature and a Patch = non breaking usually a bugfix

## Collating Issues for Release using Project Management Tool (JIRA) <a name="collating-issues-for-release"></a>
We follow these sequence of steps to produce release notes in a consistent format.

1. Identify the the JIRA Issues that are being resolved within the next release.
2. Ensure the following pre-requisites have been met before the issues can be assigned a <b>Fix Version</b> in JIRA
    - The resolution for the selected JIRA issues has been deployed to the development environment. [Deployment for Development Testing](#dev-deployment)
    - The issues have been tested and verified on the development environment
    - Any issues that fail the testing will either be removed from the next release or a solution for the fix will be required
3. Assign the <b>Fix Version</b> to each Issue
    - See [Version Control](#version-control)
4. JIRA will generate a HTML with the contents of the release
    - This can be found in the Release Pane and then under release notes within the selected release
5. Copy the release notes and follow the steps required to [create a release](#creating-a-release) on Github

## Creating a Release <a name="creating-a-release"></a>
We must create another PR for the confirmed release.

The PR will be titled using the {Release Version} (e.g. v1.2.3) and will contain a single commit.

Within the commit message target the above commit.

Also target the above commit in the version attribute in package.json file.
```
"version": "1.2.3",
```

Once this PR has been approved and merged to master we follow the next steps in order to Create a release note in the Github repository:
1. Go to https://github.com/UKHomeOffice/modern-slavery/releases
2. Click <b>Draft a New Release</b>
3. Fill out the Release Details
    - <b>Tag version</b> - See [Version Control](#version-control)
    - <b>Target</b> - Target the above commit
    - <b>Release Title</b> - Will be in the format of <b>Project Name - Version {Release Version}</b> i.e. (Modern Slavery - Version modern-slavery v.1.2.3)
    - <b>Description </b> - Here we will put the contents of our release (usually in accordance with the related JIRA release which is available in HTML format). Underneath any additional notes, we link a reference to the related code repository.
    - <b>Pre-release</b> - If the deployment is prior to a production release then we select this option to highlight this.

The above commit will also need to be deployed. See [Deployment for a Release](#release-deployment)

## Deployment & Completing a Release <a name="deployment-and-completing-a-release"></a>
### Deployment for Development Testing <a name="dev-deployment"></a>
If you are tesing issues for a release you must deploy the latest commit with the targeted issues to the developer environment. See [Deployment](#deployment)

On this service if you have merged any pull requests to the master branch your changes will be automatically deployed to the development environment.

### Deployment for a Release <a name="release-deployment"></a>
Deploy the above commit containing the issues for the release to the developer environment. See [Deployment](#deployment)

We finalise the release by archiving it in JIRA after clicking the <b>Release</b> button for the current release and logging the release date within the release details in JIRA.

### Deployment <a name="deployment"></a>
For details on how to deploy the release to an environment our <a href="https://gitlab.digital.homeoffice.gov.uk/modern-slavery/kube-modern-slavery/blob/master/README.md#general">gitlab repository</a>
