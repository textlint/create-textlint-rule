#!/bin/bash
set -eux
# test rule-name
declare currentDir=$(cd $(dirname $0);pwd)
declare dirName=$(basename "${currentDir}")
declare parentDir=$(dirname "${currentDir}")
declare testRuleName="test-rule-name";
# test for js
echo "Run: create-textlint-rule ${test-rule-name}"
cd ${currentDir}
node ${parentDir}/bin/cmd.js "${testRuleName}" --yes
ls "${currentDir}/textlint-rule-${testRuleName}/package.json" # check file
rm -rf "${currentDir}/textlint-rule-${testRuleName}"
# test for ts
echo "Run: create-textlint-rule ${test-rule-name} --typescript"
cd ${currentDir}
node ${parentDir}/bin/cmd.js "${testRuleName}" --yes --typescript
ls "${currentDir}/textlint-rule-${testRuleName}/package.json" # check file
rm -rf "${currentDir}/textlint-rule-${testRuleName}"
# test .
echo "Run: create-textlint-rule ."
mkdir "textlint-rule-${testRuleName}"
cd "textlint-rule-${testRuleName}"
node ${parentDir}/bin/cmd.js "." --yes
rm -rf "${currentDir}/textlint-rule-${testRuleName}"
