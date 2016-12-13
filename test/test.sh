#!/bin/bash
set -eux
declare currentDir=$(cd $(dirname $0);pwd)
declare dirName=$(basename "${currentDir}")
declare parentDir=$(dirname "${currentDir}")
declare testRuleName="test-rule-name";
# test
cd ${currentDir}
node ${parentDir}/bin/cmd.js "${testRuleName}" --yes
rm -rf "${currentDir}/textlint-rule-${testRuleName}"
