# Release Guidelines

# Contents
1. [Overview](#overview)
2. [Version Control](#version-control)
3. [Collating Issues for Release using Project Management Tool (JIRA)](#collating-issues-for-release)
4. [Creating a Release](#creating-a-release)
4. [Completing a Release](#completing-a-release)

## Overview <a name="overview"></a>
On every new deployment to our environment we create an assoicated release note to reflect the changes made and the reference the source code at the point in time.
We currently use <a href="https://www.atlassian.com/software/jira">JIRA</a> to manage project tasks and issues.

## Version Control <a name="version-control"></a>
We follow the verisoning format of Major.Minor.Patch i.e. (v1.2.3) where Major = breaking change, Minor non-breaking change but more than a patch, like a new feature and a Patch = non breaking usually a bugfix

## Collating Issues for Release using Project Management Tool (JIRA) <a name="collating-issues-for-release"></a>
We follow these sequence of steps to produce release notes in a consistent format.

1. Identify the the JIRA Issues that are being resolved within the next release.
2. Assign the <b>Fix Version</b> to each Issue
- See [Version Control](#version-control)
3. JIRA will generate a HTML with the contents of the release
- This can be found in the Release Pane and then under release notes within the selected release
4. Copy the release notes and follow the steps required to [create a release](#creating-a-release) on Github

## Creating a Release <a name="creating-a-release"></a>
Once the all identified issues for the release have been actioned in the codebase (merged to master), we create another PR for the {Release Version}.
The PR will be titled using the {Release Version} (e.g. v1.2.3) and will contain a single commit.
The commit message will be the exact same {Release Version} (e.g. v1.2.3).
In this commit the package.json file will be updated with the new app version number which will be the {Release Version} (e.g. v1.2.3)

Once this PR has been approved and merged to master we follow the next steps in order to Create a release note in the Github repository:
1. Go to https://github.com/UKHomeOffice/modern-slavery/releases
2. Click <b>Draft a New Release</b>
3. Fill out the Release Details
- <b>Tag version</b> - See [Version Control](#version-control)
- <b>Target</b> - This will usually be the <b>master</b> branch as this will be the most stable version of the codebase
- <b>Release Title</b> - Will be in the format of <b>Project Name - Version {Release Version}</b> i.e. (Modern Slavery - Version modern-slavery v.1.2.3)
- <b>Description </b> - Here we will put the contents of our release (usually in accordance with the related JIRA release which is available in HTML format). Underneath any additional notes, we link a reference to the related code repository.
- <b>Pre-release</b> - If the deployment is prior to a production release then we select this option to highlight this.

## Completing a Release <a name="completing-a-release"></a>
We finalise the release by archiving it in JIRA after clicking the <b>Release</b> button for the current release and logging the release date within the release details in JIRA.
