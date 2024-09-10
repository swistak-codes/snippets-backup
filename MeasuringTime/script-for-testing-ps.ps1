$m=$args[0]
$n=$args[1]

$next = New-Object int[] ($m + 1)
$goal = New-Object int[] ($m + 1)

for ($i = 0; $i -le $m; $i++) {
    $next[$i] = 0
    $goal[$i] = 1
}

$goal[$m] = -1

do {
    $value = $next[0] + 1
    $transferring = $true
    $m_current = 0

    while ($transferring) {
        if ($next[$m_current] -eq $goal[$m_current]) {
            $goal[$m_current] = $value
        } else {
            $transferring = $false
        }

        $next[$m_current]++
        $m_current++
    }
} while ($next[$m] -ne $n + 1)

Write-Host $value
