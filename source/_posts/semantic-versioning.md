---
title: "Versioning Your Software Correctly : A Guide to Semantic Versioning"
date: 2021-1-03
categories:
- Guide
- Best-Practices
tags:
- Documentation
cover : https://media.geeksforgeeks.org/wp-content/uploads/semver.png
thumbnail : https://media.geeksforgeeks.org/wp-content/uploads/semver.png
---
I don't believe enough has been written towards understanding how software products are and should be versioned. I have always meant to read through proper documentation and understand semantic versioning but have procrastinated furiously. Today though, I took out the time to go through the documentation and I am writing this post to summarize what I've understood. Let this be a `tldr;` for the next project you're going to release, and how you're planning to version it.

<!-- more -->

There are three components to a project version name, with an additional extra component for test releases. There are as follows:  
`major-version.minior-version.patch` with an additional optional dash-separated specifier for pre-releases, such as in: `major-version.minior-version.patch-alpha.1`. The following definitions would provide better understanding of what these terms actually mean:

- `major-version`: a breaking release which is backwards incompatible
- `minor-version`: a feature addition which maintains backward compatibility
- `patch`: a bug fix, without any feature addition, and maintains backward compatibility
- `pre-release-specifier`: the existence of a dash-separated pre-release-specifier tells your users that any given release might not be fully stable. It can be added to any release at any point, and the test-specifier in itself can have versions, indicated by semantic integer or other standing versioning protocols.
- Having a `0` as your major-version tells users that the release is a development release and features might be broken.
- In addition to semantic versioning and pre-release specifier, build metadata can also be added to version names by using a `+` at the end of the semantic name. Eg. `1.0.1-alpha.beta+0023`

The examples listed below provide different scenarios of versioning:

1. `0.1.33` - a development release, with an additional feature release and the 33rd bug-fix.
2. `1.4.2-alpha.2` - a breaking release from the previous major-version (`0`), with the 4th backward compatible feature addition and 2nd bug-fix. Additionally, this is an alpha pre-release, with the pre-release version set at `alpha.2` — the second backward compatible iteration over the pre-release. Note that version `1.4.3` would have higher precedence over `1.4.2-alpha.x`.

The information covered here should be enough to get you started with semantic versioning without any gaping holes in your knowledge. If this interests you, I would suggest you go through the documentation of semantic versioning available at [https://semver.org/](https://semver.org/).