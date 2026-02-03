# Component Hierarchy

This document outlines the inheritance hierarchy of the web components found in the `src/components` directory.

```
- LitElement (from 'lit' library)
  - DtBase
    - DtFormBase
      - DtText
        - DtMultiText
      - DtTextArea
      - DtNumberField
      - DtDate
        - DtDatetime
      - DtToggle
      - DtSingleSelect
      - DtMultiSelectButtonGroup
      - DtLocationMap
      - DtMultiSelect (via HasOptionsList mixin)
        - DtTags
          - DtLocation
          - DtUsersConnection
          - DtConnection
        - DtChurchHealthCircle
    - DtCopyText
    - DtLabel
    - DtButton
    - DtAlert
    - DtTile
    - DtModal
    - DtList
    - DtMapModal
    - DtLocationMapItem
    - DtIcon
    - DtChurchHealthIcon
  - DtCheckmark
  - DtExclamationCircle
  - DtSpinner
  - DtStar
```
